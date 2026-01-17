import { promises as fs } from "fs";
import path from "path";

type VisitData = {
  count: number;
  updatedAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "visits.json");

const getLock = () => {
  const globalAny = globalThis as typeof globalThis & {
    __visitLock?: Promise<void>;
  };
  if (!globalAny.__visitLock) {
    globalAny.__visitLock = Promise.resolve();
  }
  return globalAny;
};

const readData = async (): Promise<VisitData> => {
  try {
    const raw = await fs.readFile(dataFile, "utf8");
    const parsed = JSON.parse(raw) as VisitData;
    if (typeof parsed.count === "number") {
      return parsed;
    }
  } catch {
    // fall through to default
  }
  return { count: 0, updatedAt: new Date().toISOString() };
};

const writeData = async (data: VisitData) => {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2), "utf8");
};

export async function GET() {
  const data = await readData();
  return Response.json({ count: data.count });
}

export async function POST() {
  const globalAny = getLock();
  let next: Promise<void>;

  const update = async () => {
    const data = await readData();
    const nextData = {
      count: data.count + 1,
      updatedAt: new Date().toISOString(),
    };
    await writeData(nextData);
  };

  next = globalAny.__visitLock!.then(update).catch(update);
  globalAny.__visitLock = next;
  await next;

  const data = await readData();
  return Response.json({ count: data.count });
}
