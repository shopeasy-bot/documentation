import { NextResponse } from "next/server"
import { DISCORD_SUPPORT_URL } from "@/lib/contacts"

export function GET() {
  return NextResponse.redirect(DISCORD_SUPPORT_URL, 302)
}
