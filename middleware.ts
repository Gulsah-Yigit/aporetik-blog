import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Sadece /admin ve alt yolları korunsun
  if (!req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // İstersen geliştirme ortamında kilidi kapat:
  // if (process.env.NODE_ENV === "development") return NextResponse.next();

  const auth = req.headers.get("authorization");
  const USER = process.env.BASIC_AUTH_USER || "";
  const PASS = process.env.BASIC_AUTH_PASS || "";

  if (auth?.startsWith("Basic ")) {
    const encoded = auth.split(" ")[1]!;
    // Edge ortamında atob kullanılabilir
    const [u, p] = atob(encoded).split(":");
    if (u === USER && p === PASS) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Area", charset="UTF-8"',
    },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
