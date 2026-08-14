<script>
// تهيئة الاتصال بـ Supabase
const SUPABASE_URL = 'https://vfmfumnbretrwduyrvex.supabase.co';
const SUPABASE_KEY = 'sb_publishable_kJ2Oqq-m5L_Qs2yVnSbg2w_a0lm2gVn';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function submitForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    const name = form.querySelector('input[type="text"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;

    const originalText = submitBtn.innerText;
    submitBtn.disabled = true;
    submitBtn.innerText = 'جاري الإرسال...';

    try {
        const { data, error } = await _supabase
            .from('contacts')
            .insert([{ name, phone, email, message }]);

        if (error) throw error;

        alert('تم إرسال الطلب بنجاح!');
        form.reset();
    } catch (err) {
        console.error('Error:', err);
        alert('حدث خطأ أثناء الإرسال: ' + err.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
    }
}
</script>
