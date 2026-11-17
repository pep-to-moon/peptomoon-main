"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#FFFDF7", color: "#0b1623", padding: "4rem 1.5rem" }}>
        <h1 style={{ fontSize: "2rem", margin: 0 }}>Something went wrong.</h1>
        <p style={{ maxWidth: "46ch", lineHeight: 1.6 }}>The site hit an unexpected error. Please try again.</p>
        <button
          onClick={() => reset()}
          style={{ background: "#2f5f8a", color: "#ffffff", border: 0, padding: "0.9rem 1.6rem", fontWeight: 700, borderRadius: 999, cursor: "pointer" }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
