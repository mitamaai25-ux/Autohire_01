import { PrismaClient, Role, MilestoneStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const engineering = await prisma.department.upsert({
    where: { name: 'Engineering' },
    update: {},
    create: { name: 'Engineering' }
  });

  const hr = await prisma.department.upsert({
    where: { name: 'HR' },
    update: {},
    create: { name: 'HR' }
  });

  await prisma.user.upsert({
    where: { email: 'admin@onboardiq.com' },
    update: {},
    create: { email: 'admin@onboardiq.com', name: 'Admin User', role: Role.ADMIN, departmentId: hr.id }
  });

  const employee = await prisma.employee.upsert({
    where: { employeeCode: 'EMP-001' },
    update: {},
    create: {
      employeeCode: 'EMP-001',
      fullName: 'Ava Patel',
      roleTitle: 'Software Engineer',
      startDate: new Date('2026-01-10'),
      departmentId: engineering.id,
      retentionScore: 84,
      engagementScore: 78,
      productivityScore: 71
    }
  });

  const stages = [
    { name: 'Documentation', order: 1, slaHours: 24 },
    { name: 'IT Provisioning', order: 2, slaHours: 48 },
    { name: 'Manager Onboarding', order: 3, slaHours: 72 },
    { name: 'Training Completion', order: 4, slaHours: 120 }
  ];

  for (const stage of stages) {
    const created = await prisma.onboardingStage.upsert({
      where: { id: `${stage.name}` },
      update: {},
      create: { id: `${stage.name}`, ...stage }
    });

    await prisma.employeeOnboardingStage.upsert({
      where: { id: `${employee.id}-${created.id}` },
      update: {},
      create: {
        id: `${employee.id}-${created.id}`,
        employeeId: employee.id,
        stageId: created.id,
        status: stage.order < 3 ? MilestoneStatus.COMPLETED : MilestoneStatus.PENDING,
        expectedCompletion: new Date(Date.now() + stage.slaHours * 3600 * 1000)
      }
    });
  }

  await prisma.performanceReview.create({
    data: {
      employeeId: employee.id,
      reviewDate: new Date('2026-02-15'),
      productivity: 72,
      managerNotes: 'Strong early trajectory with excellent code quality.'
    }
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
