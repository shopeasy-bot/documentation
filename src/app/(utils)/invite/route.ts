import { NextResponse } from "next/server"

export function GET() {
  return NextResponse.redirect("https://discord.com/oauth2/authorize?client_id=1302236216300933171&permissions=8&scope=bot+applications.commands+identify&response_type=code&redirect_uri=https%3A%2F%2Fshopeasy.site%2Fapi%2Fcallback", 302)
}