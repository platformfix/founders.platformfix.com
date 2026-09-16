export interface InquiryPayload {
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  company_website: string;
  role: string;
  company_size: string;
  budget_range: string;
  project_description: string;
}

export async function submitInquiry(payload: InquiryPayload): Promise<{ ok: boolean }> {
  const res = await fetch("/api/inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Inquiry submission failed: ${res.status}`);
  return res.json();
}
