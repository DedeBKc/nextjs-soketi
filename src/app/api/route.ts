import { NextResponse } from "next/server";
import { pusherServer } from "~/lib/soketi";

export async function POST(request: Request) {
  const { message } = await request.json();
  try {
    const response = await pusherServer.trigger("chat-channel", "message-event", {
      message,
    });
    console.log("POST server", message);

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
  }
};
