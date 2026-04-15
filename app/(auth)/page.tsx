import styles from "./Register.module.css";

export default function RegisterPage() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1>Registrasi & KYC FreshChain</h1>
                    <p>Gabung ke FreshChain dengan role spesifik Anda.</p>
                </div>

                <form>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Nama Lengkap (Sesuai KTP)</label>
                        <input id="name" type="text" className={styles.input} placeholder="John Doe" required />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">Alamat Email</label>
                        <input id="email" type="email" className={styles.input} placeholder="johndoe@email.com" required />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="role">Pilih Role</label>
                        <select id="role" className={styles.input} required>
                            <option value="">Pilih peran Anda...</option>
                            <option value="Petani">Petani</option>
                            <option value="Investor">Investor</option>
                            <option value="Konsumen">Konsumen</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="kyc">Upload Dokumen KYC (KTP/NPWP)</label>
                        <input id="kyc" type="file" className={styles.input} accept="image/*,.pdf" />
                    </div>

                    <button type="submit" className={styles.btnSubmit}>Ajukan Verifikasi</button>
                </form>
            </div>
        </div>
    );
}
