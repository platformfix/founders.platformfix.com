import { type FormEvent, useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { submitInquiry, type InquiryPayload } from "../lib/inquiry";

const ROLES = [
  ["ceo-founder", "CEO / Founder"],
  ["coo-ops", "COO / Head of Operations"],
  ["cfo-finance", "CFO / Finance Lead"],
  ["cto-data", "CIO / CTO / Head of Data"],
  ["vp-director", "VP / Director"],
  ["other", "Other"],
];

const SIZES = [
  ["1-50", "1 - 50"],
  ["50-100", "50 - 100"],
  ["100-500", "100 - 500"],
  ["500-plus", "500+"],
];

const BUDGETS = [
  ["15k-50k", "$15K - $50K"],
  ["50k-150k", "$50K - $150K"],
  ["150k-500k", "$150K - $500K"],
  ["not-sure", "Not Sure Yet"],
];

const EMPTY: InquiryPayload = {
  first_name: "",
  last_name: "",
  email: "",
  company: "",
  company_website: "",
  role: "",
  company_size: "",
  budget_range: "",
  project_description: "",
};

export function WorkWithUsPage() {
  const [form, setForm] = useState<InquiryPayload>(EMPTY);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [budgetError, setBudgetError] = useState(false);

  function set<K extends keyof InquiryPayload>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    if (key === "budget_range" && value) setBudgetError(false);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.budget_range) {
      setBudgetError(true);
      return;
    }
    setStatus("submitting");
    try {
      await submitInquiry(form);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="min-h-screen bg-brand-gradient text-off-white flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Thanks. We've got it.</h1>
          <p className="text-cool-grey">We'll be in touch shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-gradient text-off-white">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16">
      <div>
        <p className="text-sm uppercase tracking-widest text-gold mb-4">Work With Us</p>
        <h1 className="text-4xl font-bold mb-6">Ready to transform your business with AI?</h1>
        <p className="text-cool-grey mb-10">
          We find where AI and software can cut real time and cost out of your business,
          then build and ship it ourselves, start to finish. Tell us what you're working on.
        </p>
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="font-medium text-off-white">Based in</dt>
            <dd className="text-cool-grey">United Kingdom</dd>
          </div>
          <div>
            <dt className="font-medium text-off-white">Email</dt>
            <dd className="text-cool-grey">steve@platformfix.com</dd>
          </div>
          <div>
            <dt className="font-medium text-off-white">Working globally</dt>
            <dd className="text-cool-grey">Clients across the UK, EU, and US</dd>
          </div>
        </dl>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="first_name">First Name</Label>
            <Input id="first_name" required value={form.first_name} onChange={(e) => set("first_name", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="last_name">Last Name</Label>
            <Input id="last_name" required value={form.last_name} onChange={(e) => set("last_name", e.target.value)} />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Work Email</Label>
          <Input id="email" type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} />
        </div>

        <div>
          <Label htmlFor="company">Company</Label>
          <Input id="company" required value={form.company} onChange={(e) => set("company", e.target.value)} />
        </div>

        <div>
          <Label htmlFor="company_website">Company Website</Label>
          <Input
            id="company_website"
            type="url"
            required
            placeholder="https://yourcompany.com"
            value={form.company_website}
            onChange={(e) => set("company_website", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="role">Your Role</Label>
            <Select id="role" required value={form.role} onChange={(e) => set("role", e.target.value)}>
              <option value="">Select your role</option>
              {ROLES.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="company_size">Company Size</Label>
            <Select id="company_size" required value={form.company_size} onChange={(e) => set("company_size", e.target.value)}>
              <option value="">Number of employees</option>
              {SIZES.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </Select>
          </div>
        </div>

        <div>
          <Label>Budget Range</Label>
          <div className="grid grid-cols-2 gap-3">
            {BUDGETS.map(([value, label]) => (
              <Button
                key={value}
                type="button"
                variant="budget"
                active={form.budget_range === value}
                onClick={() => set("budget_range", value)}
              >
                {label}
              </Button>
            ))}
          </div>
          {budgetError && (
            <p className="text-sm text-red-400 mt-2">Please select a budget range.</p>
          )}
        </div>

        <div>
          <Label htmlFor="project_description">Tell Us About Your Project</Label>
          <Textarea
            id="project_description"
            required
            placeholder="What challenges are you facing? What does success look like for your business?"
            value={form.project_description}
            onChange={(e) => set("project_description", e.target.value)}
          />
        </div>

        <Button type="submit" disabled={status === "submitting"} className="w-full">
          {status === "submitting" ? "Submitting…" : "Submit Inquiry"}
        </Button>
        {status === "error" && (
          <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
        )}
      </form>
      </div>
    </div>
  );
}
