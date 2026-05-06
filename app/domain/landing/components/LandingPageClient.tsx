"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Database,
  FileDown,
  FileSpreadsheet,
  Leaf,
  Target,
  type LucideIcon,
} from "lucide-react";

const reasons = [
  {
    title: "규제와 고객 요구가 제품 단위로 이동하고 있습니다",
    description:
      "기업의 총 배출량만으로는 충분하지 않습니다. 이제는 어떤 제품이, 어떤 활동에서, 얼마나 배출하는지 설명할 수 있어야 합니다.",
  },
  {
    title: "계산 기준이 흩어지면 의사결정도 흔들립니다",
    description:
      "전기, 원소재, 운송 데이터를 같은 기준으로 모아야 월별 추이와 감축 우선순위를 신뢰할 수 있습니다.",
  },
  {
    title: "추적 가능한 데이터가 보고서의 품질을 만듭니다",
    description:
      "입력값, 배출계수, 계산 결과가 함께 남아야 내부 검토와 외부 제출 모두에서 설명 가능한 보고가 됩니다.",
  },
];

const serviceFeatures: {
  description: string;
  icon: LucideIcon;
  title: string;
}[] = [
  {
    icon: Database,
    title: "활동 데이터 입력",
    description:
      "전기, 원소재, 운송 데이터를 수동 입력하거나 Excel로 가져옵니다.",
  },
  {
    icon: Leaf,
    title: "배출계수 기반 계산",
    description:
      "활동량과 배출계수를 연결해 kgCO2e 기준 배출량을 자동 계산합니다.",
  },
  {
    icon: BarChart3,
    title: "대시보드 추적",
    description:
      "월별 추이, 활동 유형별 비중, 전월 대비 변화를 한눈에 확인합니다.",
  },
  {
    icon: Target,
    title: "목표 관리",
    description:
      "월간 목표를 설정하고 초과, 주의, 정상 상태를 빠르게 판단합니다.",
  },
  {
    icon: FileDown,
    title: "PDF 보고서",
    description:
      "선택한 기간과 월 기준의 대시보드 데이터를 보고서로 내보냅니다.",
  },
  {
    icon: FileSpreadsheet,
    title: "Excel 미리보기",
    description: "저장 전 행별 오류와 배출계수 매칭 여부를 먼저 검증합니다.",
  },
];

const processSteps = [
  "활동 데이터 수집",
  "배출계수 매칭",
  "배출량 자동 계산",
  "대시보드 추적",
  "목표 관리와 보고",
];

const heroMetrics = [
  ["12,048.38", "kgCO2e 총 배출량"],
  ["68.1%", "원소재 배출 비중"],
  ["241.0%", "목표 대비 진행률"],
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardHover = {
  y: -6,
  transition: {
    duration: 0.2,
  },
};

export const LandingPageClient = () => {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10"
      >
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Carbona"
            width={148}
            height={42}
            priority
            className="h-auto w-32 sm:w-36"
          />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-500 md:flex">
          <a href="#pcf" className="transition hover:text-slate-950">
            PCF 이해
          </a>
          <a href="#why" className="transition hover:text-slate-950">
            추적 이유
          </a>
          <a href="#service" className="transition hover:text-slate-950">
            서비스
          </a>
        </nav>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/dashboard"
            className="inline-flex h-10 items-center justify-center rounded-full bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            시작하기
          </Link>
        </motion.div>
      </motion.header>

      <section className="mx-auto grid min-h-[calc(100vh-92px)] w-full max-w-7xl content-center gap-14 px-5 pb-16 pt-10 sm:px-8 lg:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          <motion.span
            variants={fadeUpVariants}
            className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700"
          >
            PCF 기반 탄소 배출량 관리 플랫폼
          </motion.span>
          <motion.h1
            variants={fadeUpVariants}
            className="mt-8 max-w-5xl text-5xl font-extrabold leading-tight tracking-normal text-slate-950 sm:text-6xl lg:text-7xl"
          >
            제품의 탄소 배출을
            <br />
            계산에서 보고까지 연결하세요.
          </motion.h1>
          <motion.p
            variants={fadeUpVariants}
            className="mt-8 max-w-3xl text-xl font-medium leading-8 text-slate-600 sm:text-2xl sm:leading-9"
          >
            Carbona는 활동 데이터와 배출계수를 연결해 제품 탄소발자국을
            계산하고, 월별 추이와 목표 대비 상태를 한 화면에서 추적하도록 돕는
            서비스입니다.
          </motion.p>
          <motion.div
            variants={fadeUpVariants}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/dashboard"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-blue-600 px-7 text-base font-bold text-white shadow-[0_14px_34px_rgba(37,99,235,0.24)] transition hover:bg-blue-700"
              >
                대시보드 시작하기
                <ArrowRight size={18} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/excel"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 text-base font-bold text-slate-800 transition hover:bg-slate-50"
              >
                Excel 가져오기
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-4 md:grid-cols-3"
        >
          {heroMetrics.map(([value, label]) => (
            <motion.div
              key={label}
              variants={fadeUpVariants}
              whileHover={cardHover}
              className="rounded-3xl border border-slate-100 bg-slate-50 p-6"
            >
              <p className="text-3xl font-extrabold tracking-normal text-blue-600">
                {value}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-500">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <motion.section
        id="pcf"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={fadeUpVariants}
        className="bg-slate-50 px-5 py-24 sm:px-8 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-extrabold text-blue-600">PCF</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-normal text-slate-950 sm:text-5xl">
              PCF는 제품 하나가 만드는 탄소 배출의 기록입니다.
            </h2>
          </div>
          <div className="space-y-6 text-lg font-medium leading-8 text-slate-600">
            <p>
              PCF(Product Carbon Footprint)는 제품의 원재료, 생산, 운송 등 활동
              과정에서 발생한 온실가스 배출량을 제품 단위로 계산한 값입니다.
            </p>
            <p>
              단순한 총량 관리가 아니라 어떤 제품과 공정이 배출을 만드는지
              확인하는 방식이기 때문에, 감축 전략을 더 구체적으로 세울 수
              있습니다.
            </p>
          </div>
        </div>
      </motion.section>

      <section id="why" className="px-5 py-24 sm:px-8 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerVariants}
          className="mx-auto max-w-7xl"
        >
          <motion.div variants={fadeUpVariants} className="max-w-3xl">
            <p className="text-sm font-extrabold text-blue-600">
              왜 추적해야 할까요
            </p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-normal text-slate-950 sm:text-5xl">
              탄소 데이터는 이제 비용, 신뢰, 거래 조건과 연결됩니다.
            </h2>
          </motion.div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {reasons.map((reason) => (
              <motion.article
                key={reason.title}
                variants={fadeUpVariants}
                whileHover={cardHover}
                className="rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
              >
                <CheckCircle2 className="text-blue-600" size={24} />
                <h3 className="mt-6 text-xl font-extrabold leading-7 tracking-normal text-slate-950">
                  {reason.title}
                </h3>
                <p className="mt-4 text-base font-medium leading-7 text-slate-600">
                  {reason.description}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section
        id="service"
        className="bg-slate-950 px-5 py-24 text-white sm:px-8 lg:px-10"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mx-auto max-w-7xl"
        >
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
          >
            <div className="max-w-3xl">
              <p className="text-sm font-extrabold text-blue-300">Carbona</p>
              <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl">
                입력, 계산, 추적, 보고를 하나의 흐름으로 묶었습니다.
              </h2>
            </div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/activities"
                className="inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-slate-950 transition hover:bg-blue-50"
              >
                데이터 입력하기
                <ArrowRight size={17} />
              </Link>
            </motion.div>
          </motion.div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {serviceFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <motion.article
                  key={feature.title}
                  variants={fadeUpVariants}
                  whileHover={{
                    y: -6,
                    backgroundColor: "rgba(255,255,255,0.08)",
                    transition: { duration: 0.2 },
                  }}
                  className="rounded-3xl border border-white/10 bg-white/4 p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-6 text-xl font-extrabold tracking-normal">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-base font-medium leading-7 text-slate-300">
                    {feature.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerVariants}
          className="mx-auto max-w-7xl"
        >
          <motion.div variants={fadeUpVariants} className="max-w-3xl">
            <p className="text-sm font-extrabold text-blue-600">Workflow</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-normal text-slate-950 sm:text-5xl">
              탄소 관리의 반복 업무를 예측 가능한 순서로 정리합니다.
            </h2>
          </motion.div>
          <div className="mt-12 grid gap-3 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <motion.div
                key={step}
                variants={fadeUpVariants}
                whileHover={cardHover}
                className="rounded-3xl border border-slate-100 bg-slate-50 p-6"
              >
                <span className="text-sm font-extrabold text-blue-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 text-lg font-extrabold text-slate-950">
                  {step}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-slate-100 px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm font-semibold text-slate-500 sm:flex-row sm:items-center">
          <Image
            src="/logo.png"
            alt="Carbona"
            width={120}
            height={34}
            className="h-auto w-28"
          />
          <p>PCF 기반 탄소 배출량 관리 플랫폼</p>
        </div>
      </footer>
    </main>
  );
};
