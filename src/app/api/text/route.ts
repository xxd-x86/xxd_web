import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const text = await prisma.text.findFirst();
    return NextResponse.json({ text: text?.content || '张智萱是超级无敌大帅哥' });
  } catch (error) {
    console.error('获取文字失败:', error);
    return NextResponse.json({ text: '张智萱是超级无敌大帅哥' });
  }
}

export async function PUT(request: Request) {
  try {
    const { text } = await request.json();
    
    const existingText = await prisma.text.findFirst();
    if (existingText) {
      await prisma.text.update({
        where: { id: existingText.id },
        data: { content: text }
      });
    } else {
      await prisma.text.create({
        data: { content: text }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('更新文字失败:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
} 