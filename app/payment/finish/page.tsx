import Link from 'next/link';

export default function PaymentFinishPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Pembayaran Berhasil!</h1>
                <p className="text-gray-600 mb-6">
                    Terima kasih. Transaksi Anda telah berhasil diproses. Status pesanan Anda akan segera diperbarui.
                </p>
                <Link href="/" className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    );
}
