import { NextResponse } from "next/server"

export function GET() {
  return NextResponse.redirect("https://discord.gg/NEqscWHqwY", 302)
}