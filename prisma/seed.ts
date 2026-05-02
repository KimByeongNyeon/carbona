import { PrismaClient, ActivityCategory } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

const main = async () => {
  await prisma.emissionFactor.deleteMany();

  await prisma.emissionFactor.createMany({
    data: [
      {
        name: "한국전력",
        category: ActivityCategory.ELECTRICITY,
        unit: "kWh",
        factor: 0.456,
        factorUnit: "kgCO2e/kWh",
      },
      {
        name: "플라스틱",
        category: ActivityCategory.MATERIAL,
        unit: "kg",
        factor: 2.3,
        factorUnit: "kgCO2e/kg",
      },
      {
        name: "트럭 운송",
        category: ActivityCategory.TRANSPORT,
        unit: "ton-km",
        factor: 3.5,
        factorUnit: "kgCO2e/ton-km",
      },
    ],
  });
};

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
