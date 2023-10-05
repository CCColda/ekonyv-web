import SiteSkeleton from "@/components/site_skeleton";

import styles from "./user.module.scss";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { StoreState } from "@/store/store";
import { useEffect } from "react";
import { Session } from "@/types/session";

export default function User() {
	const session = useSelector<StoreState, Session | null>(s => s.session.session);
	const router = useRouter();

	useEffect(() => {
		if (session == null)
			router.push("login");
	}, []);

	return <SiteSkeleton title="EKönyv - fiók" description="">
		<div className={styles.set_server}>
			<div className={styles.title}>
				<span> Felhasználói adatok </span>
			</div>
			<div className={styles.user_data}>
				<span> Felhasználónév: </span>
				<button> Kijelentkezés </button>
				<button> Kijelentkezés mindenhonnan </button>
			</div>
		</div>
	</SiteSkeleton>
}