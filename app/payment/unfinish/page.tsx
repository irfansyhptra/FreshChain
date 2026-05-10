import Link from 'next/link';

export default function PaymentUnfinishPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
                <div className="w-16 h-16 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Pembayaran Tertunda</h1>
                <p className="text-gray-600 mb-6">
                    Anda belum menyelesaikan pembayaran. Silakan selesaikan pembayaran Anda atau buat pesanan baru jika batas waktu telah habis.
                </p>
                <Link href="/" className="inline-block bg-yellow-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-yellow-600 transition-colors">
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    );
}
