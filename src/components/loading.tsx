import { ReactNode } from "react";
import styles from "./loading.module.scss"

export type LoadingProps = {
	description?: ReactNode
}

const Loading: React.FC<LoadingProps> = ({ description }) => {
	return <div className={styles.loading}>
		<div className={styles.center}>
			<div className={styles.status}>{description}</div>
			<div className={styles.spinner_container}>
				<div className={styles.spinner}></div>
				<div className={styles.spinner}></div>
				<div className={styles.spinner}></div>
				<div className={styles.spinner}></div>
			</div>
		</div>
	</div>
};

export default Loading;