import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
	return (
		<div className={styles.HomePage}>

			<div className={styles.Masthead}>
				<h1>Tes Online ADHD</h1>
				<p className={styles.Lead}>
					Selamat datang di Tes Online ADHD dari <strong>Sehat Mental Project</strong>.
				</p>
				<p>
					Hanya butuh waktu 5 menit untuk menyelesaikan tes ini.
				</p>
				<br />
				<div className={styles.Action}>
					<Link href="/test" className={styles.StartButton}>Mulai Tes</Link>
				</div>
				<br />
				<p className={styles.Disclaimer}>
					Alat skrining online ini dibuat berdasarkan kriteria <strong>DSM-IV-TR</strong> dan bertujuan untuk membantu diagnosis awal ADHD, <strong>bukan untuk menggantikan diagnosis profesional</strong>.
				</p>
			</div>

		</div>
	);
}
