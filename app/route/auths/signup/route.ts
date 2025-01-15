import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.companyName || !body.password) {
      return NextResponse.json(
        { message: "필수 데이터가 누락되었습니다." },
        { status: 400 }
      );
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/auths/signup`,
      body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return NextResponse.json({ message: "회원가입 성공" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "회원가입 실패", error: error.message },
      { status: 400 }
    );
  }
}
