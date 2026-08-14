import { createClient } from '@supabase/supabase-js';

// استدعاء القيم من متغيرات بيئة Vercel
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // استقبال طلبات POST فقط
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, phone, email, message } = req.body;

  // التحقق من الحقول الإلزامية
  if (!name || !phone || !message) {
    return res.status(400).json({ message: 'يرجى ملء جميع الحقول المطلوبة' });
  }

  try {
    // إدخال البيانات في جدول contacts في Supabase
    const { data, error } = await supabase
      .from('contacts')
      .insert([{ name, phone, email, message }]);

    if (error) {
      throw error;
    }

    return res.status(200).json({ success: true, message: 'تم إرسال البيانات بنجاح' });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'حدث خطأ في السيرفر' });
  }
}