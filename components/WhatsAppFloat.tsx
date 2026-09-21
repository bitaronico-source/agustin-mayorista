import { SITE } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${SITE.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#1fbe5a]"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 1 1 4.1-1.1l1.4.4-.4-1.3A8 8 0 0 1 12 20zm4.5-6c-.3-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7 1-.8 1.1-.3.2-.6.1a6.6 6.6 0 0 1-3.3-2.9c-.3-.4 0-.5.2-.7l.4-.5a1.7 1.7 0 0 0 .2-.4c0-.1 0-.2-.1-.4l-.8-2c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5 5 0 0 0 1 2.7 11.4 11.4 0 0 0 4.4 3.9 15 15 0 0 0 1.5.5 3.5 3.5 0 0 0 1.6.1 2.6 2.6 0 0 0 1.7-1.2 2 2 0 0 0 .1-1.2c0-.1-.2-.2-.5-.3z" />
      </svg>
    </a>
  );
}