import { prisma } from "@/lib/prisma";

const taskStatus = [
  {
    id: 1,
    name: "Backlog",
    color: "#71717a",
  },
  {
    id: 2,
    name: "A Fazer",
    color: "#3b82f6",
  },
  {
    id: 3,
    name: "Em Progresso",
    color: "#f59e0b",
  },
  {
    id: 4,
    name: "Travada",
    color: "#ef4444",
  },
  {
    id: 5,
    name: "Revisão",
    color: "#a855f7",
  },
  {
    id: 6,
    name: "Concluída",
    color: "#10b981",
  },
];

const tasksPriorities = [
  {
    id: 1,
    level: "Baixa",
  },
  {
    id: 2,
    level: "Média",
  },
  {
    id: 3,
    level: "Alta",
  },
  {
    id: 4,
    level: "Urgente",
  },
];

async function main() {
  for (const status of taskStatus) {
    try {
      console.log("SEEDING STATUS:", status.name);

      await prisma.taskStatus.upsert({
        where: { id: status.id },
        update: {},
        create: status,
      });
    } catch (error) {
      console.error("ERROR SEEDING STATUS:", status.name, error);
    }
  }

  for (const priority of tasksPriorities) {
    try {
      console.log("SEEDING PRIORITY:", priority.level);

      await prisma.taskPriority.upsert({
        where: { id: priority.id },
        update: {},
        create: priority,
      });
    } catch (error) {
      console.error("ERROR SEEDING PRIORITY:", priority.level, error);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
