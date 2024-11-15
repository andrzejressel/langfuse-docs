import { Check, Plus, Minus, X, ExternalLink } from "lucide-react";
import { Disclosure } from "@headlessui/react";
import { BorderBeam } from "../magicui/border-beam";
import Link from "next/link";
import { Header } from "../Header";
import { Button } from "../ui/button";
import { HomeSection } from "./components/HomeSection";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const deploymentOptions = {
  cloud: {
    switch: "Langfuse Cloud (we host)",
    title: "Pricing",
    subtitle:
      "Get started on the Hobby plan for free. No credit card required.",
    href: "/pricing",
  },
  selfHosted: {
    switch: "Self-hosted (you host)",
    title: "Pricing",
    subtitle:
      "Deploy Langfuse OSS today. Upgrade to Pro or Enterprise at any time.",
    href: "/pricing-self-host",
  },
};

type Tier = {
  name: string;
  id: string;
  href: string;
  featured: boolean;
  row: 1 | 2;
  description: string;
  price: string;
  mainFeatures: string[];
  cta: string;
  learnMore?: string;
};

type Tiers = {
  cloud: Tier[];
  selfHosted: Tier[];
};

const tiers: Tiers = {
  cloud: [
    {
      name: "Hobby",
      id: "tier-hobby",
      href: "https://cloud.langfuse.com",
      featured: false,
      row: 1,
      description:
        "Get started, no credit card required. Great for hobby projects and POCs.",
      price: "Free",
      mainFeatures: [
        "No credit card required",
        "Try all platform features",
        "Up to 50k events / month",
        "Up to 2 users",
      ],
      cta: "Sign up",
    },
    {
      name: "Mini",
      id: "tier-mini",
      href: "https://cloud.langfuse.com",
      featured: false,
      row: 2,
      description:
        "Get started, no credit card required. Great for hobby projects and POCs.",
      price: "Free",
      mainFeatures: [
        "No credit card required",
        "Try all platform features",
        "Up to 50k events / month",
        "Up to 2 users",
      ],
      cta: "Sign up",
    },
    {
      name: "Pro",
      id: "tier-pro",
      href: "https://cloud.langfuse.com",
      featured: true,
      row: 1,
      description:
        "For production projects. Includes access to full history and higher usage. Discounts available.",
      price: "$30",
      mainFeatures: [
        "100k events / month included, additional: $10 / 100k events",
        "Includes all platform features",
        "Unlimited data history",
        "Support via Email/Chat",
      ],
      cta: "Sign up",
    },
    {
      name: "Team",
      id: "tier-team",
      href: "https://cloud.langfuse.com",
      featured: false,
      row: 1,
      description:
        "For production projects. Includes access to full history and higher usage. Discounts available.",
      price: "$30",
      mainFeatures: [
        "100k events / month included, additional: $10 / 100k events",
        "Includes all platform features",
        "Unlimited data history",
        "Support via Email/Chat",
      ],
      cta: "Sign up",
    },
    {
      name: "Enterprise",
      id: "tier-enterprise",
      href: "/schedule-demo",
      featured: false,
      row: 2,
      price: "Custom",
      description:
        "Dedicated solutions and support for your team. Contact us for pricing.",
      mainFeatures: [
        "Unlimited tracing throughput",
        "SSO and fine-grained RBAC",
        "SOC2, ISO27001, and InfoSec reviews",
        "Dedicated support engineer and SLAs",
        "Self-hosting available",
      ],
      cta: "Talk to founders",
      learnMore: "/enterprise",
    },
  ],
  selfHosted: [
    {
      name: "Open Source",
      id: "tier-self-hosted-oss",
      href: "/docs/deployment/self-host",
      featured: true,
      description:
        "Self-host all core Langfuse features for free without any limitations.",
      price: "Free",
      row: 1,
      mainFeatures: [
        "MIT License",
        "All core platform features and APIs (observability, evaluation, prompt management, datasets, etc.)",
        "Unlimited usage",
        "Deployment docs & Helm chart",
        "Community support",
      ],
      cta: "Deployment guide",
    },
    {
      name: "Pro",
      id: "tier-self-hosted-pro",
      href: "https://buy.stripe.com/aEU6qufIwfJy0CYbIR",
      featured: false,
      description:
        "Get access to additional workflow features to accelerate your team.",
      price: "$100",
      row: 1,
      mainFeatures: [
        "All Open Source features",
        "LLM Playground",
        "Human annotation queues",
        "LLM as a judge evaluators (soon)",
        "Chat & Email support",
      ],
      cta: "Subscribe",
    },
    {
      name: "Enterprise",
      id: "tier-self-hosted-enterprise",
      href: "/schedule-demo",
      featured: false,
      row: 1,
      price: "Custom",
      description:
        "Enterprise-grade support and security features. Contact us for pricing.",
      mainFeatures: [
        "All Open Source / Pro features",
        "SSO and fine-grained RBAC",
        "SOC2, ISO27001, and InfoSec reviews",
        "Dedicated support engineer and SLAs",
      ],
      cta: "Talk to founders",
      learnMore: "/enterprise",
    },
  ],
} as const;

const sections = [
  {
    name: "Tracing",
    href: "/docs/tracing",
    features: [
      {
        name: "Integrations/SDKs",
        href: "/docs/integrations/overview",
        tiers: {
          cloud: {
            Hobby: true,
            Mini: true,
            Pro: true,
            Team: true,
            Enterprise: true,
          },
          selfHosted: { "Open Source": true, Pro: true, Enterprise: true },
        },
      },
      {
        name: "Custom via API",
        href: "https://api.reference.langfuse.com/#post-/api/public/ingestion",
        tiers: {
          cloud: {
            Hobby: true,
            Mini: true,
            Pro: true,
            Team: true,
            Enterprise: true,
          },
          selfHosted: { "Open Source": true, Pro: true, Enterprise: true },
        },
      },
      {
        name: "Included usage",
        tiers: {
          cloud: {
            Hobby: "50k events",
            Mini: "50k events",
            Pro: "100k events",
            Team: "100k events",
            Enterprise: "Custom",
          },
          selfHosted: {
            "Open Source": "Unlimited",
            Pro: "Unlimited",
            Enterprise: "Unlimited",
          },
        },
      },
      {
        name: "Additional usage",
        tiers: {
          cloud: {
            Hobby: false,
            Mini: "$10 / 100k events",
            Pro: "$10 / 100k events",
            Team: "$10 / 100k events",
            Enterprise: "Custom",
          },
          selfHosted: {
            "Open Source": "n/a",
            Pro: "n/a",
            Enterprise: "n/a",
          },
        },
      },
      {
        name: "Access to historical data",
        tiers: {
          cloud: {
            Hobby: "30 days",
            Mini: "30 days",
            Pro: "Unlimited",
            Team: "Unlimited",
            Enterprise: "Unlimited",
          },
          selfHosted: {
            "Open Source": "Unlimited",
            Pro: "Unlimited",
            Enterprise: "Unlimited",
          },
        },
      },
      {
        name: "Ingestion throughput",
        tiers: {
          cloud: {
            Hobby: "1000 requests / min",
            Mini: "1000 requests / min",
            Pro: "1000 requests / min",
            Team: "1000 requests / min",
            Enterprise: "Custom",
          },
          selfHosted: {
            "Open Source": "Unlimited",
            Pro: "Unlimited",
            Enterprise: "Unlimited",
          },
        },
      },
    ],
  },
  {
    name: "Core Platform Features",
    features: [
      {
        name: "Datasets",
        href: "/docs/datasets",
        tiers: {
          cloud: {
            Hobby: true,
            Mini: true,
            Pro: true,
            Team: true,
            Enterprise: true,
          },
          selfHosted: { "Open Source": true, Pro: true, Enterprise: true },
        },
      },
      {
        name: "Evaluation / User-feedback",
        href: "/docs/scores",
        tiers: {
          cloud: {
            Hobby: true,
            Mini: true,
            Pro: true,
            Team: true,
            Enterprise: true,
          },
          selfHosted: { "Open Source": true, Pro: true, Enterprise: true },
        },
      },
      {
        name: "Prompt Management",
        href: "/docs/prompts",
        tiers: {
          cloud: {
            Hobby: "10 prompts",
            Mini: "10 prompts",
            Pro: true,
            Team: true,
            Enterprise: true,
          },
          selfHosted: {
            "Open Source": true,
            Pro: true,
            Enterprise: true,
          },
        },
      },
    ],
  },
  {
    name: "Add-on Features",
    features: [
      {
        name: "Playground",
        href: "/docs/playground",
        tiers: {
          cloud: {
            Hobby: true,
            Mini: true,
            Pro: true,
            Team: true,
            Enterprise: true,
          },
          selfHosted: { "Open Source": false, Pro: true, Enterprise: true },
        },
      },
      {
        name: "LLM-as-judge evaluators",
        href: "/docs/scores/model-based-evals",
        tiers: {
          cloud: {
            Hobby: "1 evaluator",
            Mini: "1 evaluator",
            Pro: true,
            Team: true,
            Enterprise: true,
          },
          selfHosted: {
            "Open Source": false,
            Pro: "soon",
            Enterprise: "soon",
          },
        },
      },
      {
        name: "Human Annotation Queues",
        href: "/docs/scores/annotation#annotation-queues",
        tiers: {
          cloud: {
            Hobby: "1 queue",
            Mini: "1 queue",
            Pro: "3 queues",
            Team: "3 queues",
            Enterprise: true,
          },
          selfHosted: {
            "Open Source": false,
            Pro: true,
            Enterprise: true,
          },
        },
      },
    ],
  },
  {
    name: "Collaboration",
    features: [
      {
        name: "Projects",
        tiers: {
          cloud: {
            Hobby: "Unlimited",
            Mini: "Unlimited",
            Pro: "Unlimited",
            Team: "Unlimited",
            Enterprise: "Unlimited",
          },
          selfHosted: {
            "Open Source": "Unlimited",
            Pro: "Unlimited",
            Enterprise: "Unlimited",
          },
        },
      },
      {
        name: "Users",
        tiers: {
          cloud: {
            Hobby: "2",
            Mini: "2",
            Pro: "Unlimited",
            Team: "Unlimited",
            Enterprise: "Unlimited",
          },
          selfHosted: {
            "Open Source": "Unlimited",
            Pro: "Unlimited",
            Enterprise: "Unlimited",
          },
        },
      },
    ],
  },
  {
    name: "API",
    href: "/docs/api",
    features: [
      {
        name: "Extensive GET API",
        tiers: {
          cloud: {
            Hobby: true,
            Mini: true,
            Pro: true,
            Team: true,
            Enterprise: true,
          },
          selfHosted: {
            "Open Source": true,
            Pro: true,
            Enterprise: true,
          },
        },
      },
      {
        name: "Rate limit",
        tiers: {
          cloud: {
            Hobby: "100 requests / min",
            Mini: "100 requests / min",
            Pro: "1000 requests / min",
            Team: "1000 requests / min",
            Enterprise: "Custom",
          },
          selfHosted: {
            "Open Source": "n/a",
            Pro: "n/a",
            Enterprise: "n/a",
          },
        },
      },
      {
        name: "Metrics API",
        tiers: {
          cloud: {
            Hobby: "10 requests / day",
            Mini: "10 requests / day",
            Pro: "100 requests / day",
            Team: "100 requests / day",
            Enterprise: "Custom",
          },
          selfHosted: {
            "Open Source": "n/a",
            Pro: "n/a",
            Enterprise: "n/a",
          },
        },
      },
    ],
  },
  {
    name: "Support",
    features: [
      {
        name: "Community (GitHub, Discord)",
        tiers: {
          cloud: {
            Hobby: true,
            Mini: true,
            Pro: true,
            Team: true,
            Enterprise: true,
          },
          selfHosted: { "Open Source": true, Pro: true, Enterprise: true },
        },
      },
      {
        name: "Chat & Email",
        tiers: {
          cloud: {
            Hobby: false,
            Mini: false,
            Pro: true,
            Team: true,
            Enterprise: true,
          },
          selfHosted: { "Open Source": false, Pro: true, Enterprise: true },
        },
      },
      {
        name: "Private Slack/Discord channel",
        tiers: {
          cloud: {
            Hobby: false,
            Mini: false,
            Pro: false,
            Team: true,
            Enterprise: true,
          },
          selfHosted: {
            "Open Source": false,
            Pro: "Add-on, included at >10 users",
            Enterprise: true,
          },
        },
      },
      {
        name: "Dedicated Support Engineer",
        tiers: {
          cloud: {
            Hobby: false,
            Mini: false,
            Pro: false,
            Team: true,
            Enterprise: true,
          },
          selfHosted: { "Open Source": false, Pro: false, Enterprise: true },
        },
      },
      {
        name: "SLAs",
        tiers: {
          cloud: {
            Hobby: false,
            Mini: false,
            Pro: false,
            Team: true,
            Enterprise: "Available",
          },
          selfHosted: {
            "Open Source": false,
            Pro: false,
            Enterprise: "Available",
          },
        },
      },
    ],
  },
  {
    name: "Security",
    href: "/docs/security",
    features: [
      {
        name: "Data region",
        tiers: {
          cloud: {
            Hobby: "US or EU",
            Mini: "US or EU",
            Pro: "US or EU",
            Team: "US or EU",
            Enterprise: "US or EU",
          },
          selfHosted: {
            "Open Source": "Own infrastructure",
            Pro: "Own infrastructure",
            Enterprise: "Own infrastructure",
          },
        },
      },
      {
        name: "SSO via Google, AzureAD, GitHub",
        tiers: {
          cloud: {
            Hobby: true,
            Mini: true,
            Pro: true,
            Team: true,
            Enterprise: true,
          },
          selfHosted: {
            "Open Source": true,
            Pro: true,
            Enterprise: true,
          },
        },
      },
      {
        name: "Organization-level RBAC",
        href: "/docs/rbac",
        tiers: {
          cloud: {
            Hobby: true,
            Mini: true,
            Pro: true,
            Team: true,
            Enterprise: true,
          },
          selfHosted: {
            "Open Source": true,
            Pro: true,
            Enterprise: true,
          },
        },
      },
      {
        name: "Enterprise SSO (e.g. Okta, Auth0)",
        tiers: {
          cloud: {
            Hobby: false,
            Mini: false,
            Pro: false,
            Team: true,
            Enterprise: true,
          },
          selfHosted: { "Open Source": false, Pro: false, Enterprise: true },
        },
      },
      {
        name: "SSO enforcement",
        tiers: {
          cloud: {
            Hobby: false,
            Mini: false,
            Pro: false,
            Team: true,
            Enterprise: true,
          },
          selfHosted: { "Open Source": false, Pro: false, Enterprise: true },
        },
      },
      {
        name: "Project-level RBAC",
        href: "/docs/rbac",
        tiers: {
          cloud: {
            Hobby: false,
            Mini: false,
            Pro: false,
            Team: true,
            Enterprise: true,
          },
          selfHosted: { "Open Source": false, Pro: false, Enterprise: true },
        },
      },
      {
        name: "Data retention management",
        tiers: {
          cloud: {
            Hobby: false,
            Mini: false,
            Pro: false,
            Team: true,
            Enterprise: true,
          },
          selfHosted: {
            "Open Source": false,
            Pro: false,
            Enterprise: "soon",
          },
        },
      },
    ],
  },
  {
    name: "Compliance",
    href: "/docs/security",
    features: [
      {
        name: "Data processing agreement (GDPR)",
        tiers: {
          cloud: {
            Hobby: false,
            Mini: false,
            Pro: true,
            Team: true,
            Enterprise: true,
          },
          selfHosted: { "Open Source": false, Pro: false, Enterprise: true },
        },
      },
      {
        name: "SOC2 Type II & ISO27001 reports",
        tiers: {
          cloud: {
            Hobby: false,
            Mini: false,
            Pro: false,
            Team: true,
            Enterprise: true,
          },
          selfHosted: { "Open Source": false, Pro: false, Enterprise: true },
        },
      },
      {
        name: "InfoSec reviews",
        tiers: {
          cloud: {
            Hobby: false,
            Mini: false,
            Pro: false,
            Team: true,
            Enterprise: true,
          },
          selfHosted: { "Open Source": false, Pro: false, Enterprise: true },
        },
      },
    ],
  },
];

const gridColsClass = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

const TierCard = ({ tier }: { tier: Tier }) => {
  return (
    <div
      key={tier.id}
      className={classNames(
        tier.featured
          ? "z-10 bg-slate-100 shadow-xl ring-1 ring-gray-900/10"
          : "bg-gray-800/80 ring-1 ring-white/10 lg:bg-transparent lg:pb-14 lg:ring-0",
        "relative rounded"
      )}
    >
      {tier.featured && <BorderBeam borderWidth={2} />}
      <div className="p-8 lg:pt-12 xl:p-10 xl:pt-14">
        <h3
          id={tier.id}
          className={classNames(
            tier.featured ? "text-gray-900" : "text-white",
            "text-sm font-semibold leading-6"
          )}
        >
          {tier.name}
        </h3>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-stretch">
          <div className="mt-2 flex items-center gap-x-4">
            <p
              className={classNames(
                tier.featured ? "text-gray-900" : "text-white",
                "text-4xl font-bold tracking-tight"
              )}
            >
              {tier.price}
            </p>
            {tier.name === "Pro" && (
              <div className="text-sm leading-5">
                <p className={tier.featured ? "text-gray-900" : "text-white"}>
                  USD / user
                </p>
                <p
                  className={tier.featured ? "text-gray-500" : "text-gray-400"}
                >{`Billed monthly`}</p>
              </div>
            )}
          </div>
          <Button
            asChild
            className="z-10"
            variant={tier.featured ? "cta" : "secondary"}
          >
            <Link href={tier.href}>{tier.cta}</Link>
          </Button>
        </div>
        <p
          className={classNames(
            tier.featured ? "text-gray-600" : "text-gray-300",
            "text-sm leading-6 mt-6"
          )}
        >
          {tier.description}
          {tier.learnMore && (
            <>
              {" "}
              <Link href={tier.learnMore} className="underline">
                Learn more
              </Link>
              .
            </>
          )}
        </p>
        <div className="mt-8 flow-root sm:mt-10">
          <ul
            role="list"
            className={classNames(
              tier.featured
                ? "divide-gray-900/5 border-gray-900/5 text-gray-600"
                : "divide-white/5 border-white/5 text-white",
              "-my-2 divide-y border-t text-sm leading-6 lg:border-t-0"
            )}
          >
            {tier.mainFeatures.map((mainFeature) => (
              <li key={mainFeature} className="flex gap-x-3 py-2">
                <Check
                  className={classNames(
                    tier.featured ? "text-indigo-600" : "text-gray-500",
                    "h-6 w-5 flex-none"
                  )}
                  aria-hidden="true"
                />
                {mainFeature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default function Pricing({
  isPricingPage = false,
  initialVariant = "cloud",
}: {
  isPricingPage?: boolean;
  initialVariant?: "cloud" | "selfHosted";
}) {
  const [localVariant, setLocalVariant] = useState(initialVariant);

  const variant = isPricingPage ? initialVariant : localVariant;
  const selectedTiers = tiers[variant];

  const InfoLink = ({ href }: { href: string }) => (
    <Link href={href} className="inline-block" target="_blank">
      <ExternalLink className="size-4 ml-2 pt-0.5" />
    </Link>
  );
  return (
    <HomeSection id="pricing" className={cn(isPricingPage && "px-0 sm:px-0")}>
      <div className="isolate overflow-hidden">
        <div className="flow-root pb-16 lg:pb-0">
          <div className="mx-auto max-w-7xl">
            <Header
              title={deploymentOptions[variant].title}
              description={deploymentOptions[variant].subtitle}
              h="h1"
            />

            {/* Pricing page (different href), landingpage (local state) */}
            <Tabs
              defaultValue={variant}
              value={variant}
              className="mt-4 flex justify-center"
              onValueChange={(value) => {
                if (!isPricingPage) {
                  setLocalVariant(value as "cloud" | "selfHosted");
                }
              }}
            >
              <TabsList>
                {Object.keys(deploymentOptions).map((key) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    asChild={isPricingPage} // Only use asChild on pricing page
                  >
                    {isPricingPage ? (
                      <Link href={deploymentOptions[key].href}>
                        {deploymentOptions[key].switch}
                      </Link>
                    ) : (
                      deploymentOptions[key].switch
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="relative mx-auto mt-10 grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <div
                className="hidden lg:absolute lg:inset-x-px lg:bottom-4 lg:top-4 lg:block lg:rounded lg:bg-gray-800/80 lg:ring-1 lg:ring-white/10"
                aria-hidden="true"
              />
              {selectedTiers
                .filter((tier) => tier.row === 1)
                .map((tier) => (
                  <TierCard key={tier.id} tier={tier} />
                ))}
            </div>
            <div className="relative mx-auto mt-10 grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div
                className="hidden lg:absolute lg:inset-x-px lg:bottom-4 lg:top-4 lg:block lg:rounded lg:bg-gray-800/80 lg:ring-1 lg:ring-white/10"
                aria-hidden="true"
              />
              {selectedTiers
                .filter((tier) => tier.row === 2)
                .map((tier) => (
                  <TierCard key={tier.id} tier={tier} />
                ))}
            </div>
          </div>
        </div>
        {isPricingPage ? (
          <>
            <div className="relative">
              <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                {/* Feature comparison (up to lg) */}
                <section
                  aria-labelledby="mobile-comparison-heading"
                  className="lg:hidden"
                >
                  <h2 id="mobile-comparison-heading" className="sr-only">
                    Feature comparison
                  </h2>

                  <div className="mx-auto max-w-2xl space-y-16">
                    {selectedTiers.map((tier) => (
                      <div
                        key={tier.id}
                        className="border-t border-gray-900/10"
                      >
                        <div
                          className={classNames(
                            tier.featured
                              ? "border-indigo-600"
                              : "border-transparent",
                            "-mt-px w-72 border-t-2 pt-10 md:w-80"
                          )}
                        >
                          <h3
                            className={classNames(
                              tier.featured
                                ? "text-indigo-600 dark:text-indigo-400"
                                : "text-primary",
                              "text-sm font-semibold leading-6"
                            )}
                          >
                            {tier.name}
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-primary/60">
                            {tier.description}
                          </p>
                        </div>

                        <div className="mt-10 space-y-10">
                          {sections.map((section) => (
                            <div key={section.name}>
                              <div>
                                <h4 className="text-sm font-semibold leading-6 text-primary inline">
                                  {section.name}
                                </h4>
                                {section.href && (
                                  <InfoLink href={section.href} />
                                )}
                              </div>
                              <div className="relative mt-6">
                                {/* Fake card background */}
                                <div
                                  aria-hidden="true"
                                  className="absolute inset-y-0 right-0 hidden w-1/2 rounded bg-white dark:bg-gray-800/80 shadow-sm sm:block"
                                />

                                <div
                                  className={classNames(
                                    tier.featured
                                      ? "ring-2 ring-indigo-600"
                                      : "ring-1 ring-gray-900/10",
                                    "relative rounded bg-white dark:bg-gray-800/80 shadow-sm sm:rounded-none dark:sm:bg-transparent sm:shadow-none sm:ring-0"
                                  )}
                                >
                                  <dl className="divide-y divide-gray-200 text-sm leading-6">
                                    {section.features.map((feature) => (
                                      <div
                                        key={feature.name}
                                        className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0"
                                      >
                                        <dt className="pr-4 text-primary/60">
                                          {feature.name}
                                          {feature.href && (
                                            <InfoLink href={feature.href} />
                                          )}
                                        </dt>
                                        <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                          {typeof feature.tiers[variant][
                                            tier.name
                                          ] === "string" ? (
                                            <span
                                              className={classNames(
                                                tier.featured
                                                  ? "font-semibold text-indigo-600 dark:text-indigo-400"
                                                  : "text-primary",
                                                "text-sm leading-6"
                                              )}
                                            >
                                              {
                                                feature.tiers[variant][
                                                  tier.name
                                                ]
                                              }
                                            </span>
                                          ) : (
                                            <>
                                              {feature.tiers[variant][
                                                tier.name
                                              ] === true ? (
                                                <Check
                                                  className="mx-auto h-5 w-5 text-indigo-600"
                                                  aria-hidden="true"
                                                />
                                              ) : (
                                                <X
                                                  className="mx-auto h-5 w-5 text-gray-400"
                                                  aria-hidden="true"
                                                />
                                              )}
                                            </>
                                          )}
                                        </dd>
                                      </div>
                                    ))}
                                  </dl>
                                </div>

                                {/* Fake card border */}
                                <div
                                  aria-hidden="true"
                                  className={classNames(
                                    tier.featured
                                      ? "ring-2 ring-indigo-600"
                                      : "ring-1 ring-gray-900/10",
                                    "pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 rounded sm:block"
                                  )}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Feature comparison (lg+) */}
                <section
                  aria-labelledby="comparison-heading"
                  className="hidden lg:block"
                >
                  <h2 id="comparison-heading" className="sr-only">
                    Feature comparison
                  </h2>

                  <div
                    className={classNames(
                      "grid",
                      gridColsClass[selectedTiers.length + 1],
                      "gap-x-8 border-t border-gray-900/10 before:block"
                    )}
                  >
                    {selectedTiers.map((tier) => (
                      <div key={tier.id} aria-hidden="true" className="-mt-px">
                        <div
                          className={classNames(
                            tier.featured
                              ? "border-indigo-600"
                              : "border-transparent",
                            "border-t-2 pt-10"
                          )}
                        >
                          <p
                            className={classNames(
                              tier.featured
                                ? "text-indigo-600 dark:text-indigo-400"
                                : "text-primary",
                              "text-sm font-semibold leading-6"
                            )}
                          >
                            {tier.name}
                          </p>
                          <p className="mt-1 text-sm leading-6 text-primary/70">
                            {tier.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="-mt-6 space-y-16">
                    {sections.map((section) => (
                      <div key={section.name}>
                        <div>
                          <h3 className="text-sm font-semibold leading-6 text-primary inline">
                            {section.name}
                          </h3>
                          {section.href && <InfoLink href={section.href} />}
                        </div>
                        <div className="relative -mx-8 mt-10">
                          {/* Fake card backgrounds */}
                          <div
                            className={classNames(
                              "absolute inset-x-8 inset-y-0 grid",
                              gridColsClass[selectedTiers.length + 1],
                              "gap-x-8 before:block"
                            )}
                            aria-hidden="true"
                          >
                            <div className="h-full w-full rounded bg-white dark:bg-gray-800/80 shadow-sm" />
                            <div className="h-full w-full rounded bg-white dark:bg-gray-800/80 shadow-sm" />
                            <div className="h-full w-full rounded bg-white dark:bg-gray-800/80 shadow-sm" />
                          </div>

                          <table className="relative w-full border-separate border-spacing-x-8">
                            <thead>
                              <tr className="text-left">
                                <th scope="col">
                                  <span className="sr-only">Feature</span>
                                </th>
                                {selectedTiers.map((tier) => (
                                  <th key={tier.id} scope="col">
                                    <span className="sr-only">
                                      {tier.name} tier
                                    </span>
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {section.features.map((feature, featureIdx) => (
                                <tr key={feature.name}>
                                  <th
                                    scope="row"
                                    className="w-1/6 py-3 pr-4 text-left text-sm font-normal leading-6 text-primary"
                                  >
                                    <div>
                                      {feature.name}
                                      {feature.href && (
                                        <InfoLink href={feature.href} />
                                      )}
                                    </div>
                                    {featureIdx !==
                                    section.features.length - 1 ? (
                                      <div className="absolute inset-x-8 mt-3 h-px bg-gray-200" />
                                    ) : null}
                                  </th>
                                  {selectedTiers.map((tier) => (
                                    <td
                                      key={tier.id}
                                      className="relative w-1/6 px-4 py-0 text-center"
                                    >
                                      <span className="relative h-full w-full py-3">
                                        {typeof feature.tiers[variant][
                                          tier.name
                                        ] === "string" ? (
                                          <span
                                            className={classNames(
                                              tier.featured
                                                ? "font-semibold text-indigo-600 dark:text-indigo-400"
                                                : "text-primary",
                                              "text-sm leading-6"
                                            )}
                                          >
                                            {feature.tiers[variant][tier.name]}
                                          </span>
                                        ) : (
                                          <>
                                            {feature.tiers[variant][
                                              tier.name
                                            ] === true ? (
                                              <Check
                                                className="mx-auto h-5 w-5 text-indigo-600"
                                                aria-hidden="true"
                                              />
                                            ) : (
                                              <X
                                                className="mx-auto h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                              />
                                            )}
                                          </>
                                        )}
                                      </span>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>

                          {/* Fake card borders */}
                          <div
                            className={classNames(
                              "pointer-events-none absolute inset-x-8 inset-y-0 grid",
                              gridColsClass[selectedTiers.length + 1],
                              "gap-x-8 before:block"
                            )}
                            aria-hidden="true"
                          >
                            {selectedTiers.map((tier) => (
                              <div
                                key={tier.id}
                                className={classNames(
                                  tier.featured
                                    ? "ring-2 ring-indigo-600"
                                    : "ring-1 ring-gray-900/10",
                                  "rounded"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
            <DiscountOverview className="mt-10" />
            <PricingFAQ />
          </>
        ) : (
          <>
            <div className="text-center mt-10">
              For a detailed comparison and FAQ, see our{" "}
              <Link
                href={deploymentOptions[variant].href}
                className="underline"
              >
                pricing page
              </Link>
              .
            </div>
          </>
        )}
      </div>
    </HomeSection>
  );
}

const discounts = [
  {
    name: "Early-stage startups",
    description: "50% off, first year",
  },
  {
    name: "Education / Non-profits",
    description: "Up to 100% off, limits apply",
  },
  {
    name: "Open-source projects",
    description: "USD 300 in credits, first year",
  },
];

const DiscountOverview = ({ className }: { className?: string }) => (
  <div className={cn("mx-auto max-w-7xl px-6 lg:px-8", className)}>
    <div className="mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold leading-10 tracking-tight text-primary">
        Discounts
      </h2>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {discounts.map((discount) => (
          <div
            key={discount.name}
            className="rounded-lg border border-gray-200 p-4 shadow-sm"
          >
            <dt className="text-base font-semibold leading-7 text-primary">
              {discount.name}
            </dt>
            <dd className="mt-2 text-sm leading-7 text-primary/60">
              {discount.description}
            </dd>
          </div>
        ))}
      </div>
      <p className="mt-6 leading-8 text-primary/60">
        Reach out to{" "}
        <Link href="mailto:support@langfuse.com" className="underline">
          support@langfuse.com
        </Link>{" "}
        to apply for a discount. We want all startups, educational users,
        non-profits and open source projects to build with Langfuse and are
        happy to work with you to make that happen.
      </p>
    </div>
  </div>
);

const faqs = [
  {
    question: "What is the easiest way to try Langfuse?",
    answer:
      "You can view the <a class='underline' href='/demo'>public demo project</a> or sign up for a <a class='underline' href='https://cloud.langfuse.com'>free account</a> to try Langfuse with your own data. The Hobby plan is completeley free and does not require a credit card.",
  },
  {
    question: "What is an event?",
    answer:
      "Events are the sum of all traces, observations and evaluation scores logged to Langfuse. Check out the <a class='underline' href='/docs/tracing'>Langfuse Tracing docs<a/> for more details.<br/>For example, a trace that includes 1 LLM call (generation), 2 spans (non-LLM logic), and 2 scores (user feedback and an evaluation results) would consist of 6 events.",
  },
  {
    question: "Can I self-host Langfuse?",
    answer:
      "Yes, Langfuse is open source and you can run Langfuse <a class='underline' href='/docs/deployment/local'>locally using docker compose<a/> or for <a class='underline' href='/docs/deployment/self-host'>production use via docker<a/> and a standalone database.",
  },
  {
    question: "Where is the data stored?",
    answer:
      "Langfuse Cloud is hosted on AWS and data is stored in the US or EU depending on your selection. See our <a class='underline' href='/docs/data-security-privacy'>security and privacy documentation</a> for more details.",
  },
  {
    question: "Do you offer discounts?",
    answer:
      "Yes, we offer discounts for startups, students, academics and open-source projects. If you believe your situation warrants a discount, please contact us at support@langfuse.com with details about your project.",
  },
  {
    question: "How do I activate my self-hosted Pro or Enterprise plan?",
    answer:
      "Once you've deployed Langfuse OSS, you can activate your Pro or Enterprise plan by adding the license key you received from the Langfuse team to your deployment.",
  },
  {
    question: "How can I manage my subscription?",
    answer:
      "You can manage your subscription through the organization settings in Langfuse Cloud or by using this <a class='underline' href='https://billing.stripe.com/p/login/6oE9BXd4u8PR2aYaEE'>Customer Portal</a> for both Langfuse Cloud and Self-Hosted subscriptions.",
  },
];

export function PricingFAQ() {
  return (
    <div id="faq">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-primary/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-primary">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-primary/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-primary">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <Minus className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <Plus className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p
                        className="text-base leading-7 text-primary/70"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
