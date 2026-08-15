import { describe, it, expect } from "vitest";
import { esc, isValidEmail, isValidText } from "./validation.ts";

/*
 * Guards a security boundary, so these are regression tests rather than
 * documentation.
 *
 * The contact function interpolated caller-supplied values straight into the
 * HTML of mail sent from the verified gosafespend.com domain, including inside
 * an href. Combined with unauthenticated access that gave an attacker
 * arbitrary HTML in a message from your domain to any recipient -- a phishing
 * kit borrowing your SPF/DKIM alignment.
 */

describe("esc", () => {
  it("neutralises a link injected into a message body", () => {
    expect(esc('<a href="https://evil.test">click</a>')).toBe(
      "&lt;a href=&quot;https://evil.test&quot;&gt;click&lt;/a&gt;",
    );
  });

  it("neutralises a script tag", () => {
    expect(esc("<script>alert(1)</script>")).not.toContain("<script>");
  });

  it("escapes quotes, so a value cannot break out of an href attribute", () => {
    expect(esc('" onmouseover="steal()')).toBe(
      "&quot; onmouseover=&quot;steal()",
    );
    expect(esc("' onclick='x")).toBe("&#39; onclick=&#39;x");
  });

  it("escapes ampersands first, so entities are not double-decoded", () => {
    expect(esc("&lt;")).toBe("&amp;lt;");
  });

  it("leaves ordinary text alone", () => {
    expect(esc("Hi, I have a question about pricing.")).toBe(
      "Hi, I have a question about pricing.",
    );
  });

  it("renders null and undefined as empty rather than the literal words", () => {
    expect(esc(null)).toBe("");
    expect(esc(undefined)).toBe("");
  });
});

describe("isValidEmail", () => {
  it("accepts an ordinary address", () => {
    expect(isValidEmail("someone@example.com")).toBe(true);
  });

  it.each([
    ["missing an @", "not-an-email"],
    ["no domain dot", "user@localhost"],
    ["a space", "user name@example.com"],
    ["empty", ""],
    ["not a string", 42],
  ])("rejects %s", (_label, value) => {
    expect(isValidEmail(value)).toBe(false);
  });

  it("rejects an address longer than the RFC limit", () => {
    expect(isValidEmail(`${"a".repeat(250)}@example.com`)).toBe(false);
  });
});

describe("isValidText", () => {
  it("accepts text within the limit", () => {
    expect(isValidText("Hello", { max: 100 })).toBe(true);
  });

  it("rejects text over the limit", () => {
    expect(isValidText("a".repeat(5001), { max: 5000 })).toBe(false);
  });

  it("rejects whitespace-only input", () => {
    expect(isValidText("   \n\t ", { max: 100 })).toBe(false);
  });

  it("rejects non-strings", () => {
    expect(isValidText(undefined, { max: 100 })).toBe(false);
    expect(isValidText({}, { max: 100 })).toBe(false);
  });
});
