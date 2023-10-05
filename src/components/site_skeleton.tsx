import Head from "next/head";
import { FC, useEffect, useState } from "react";

import SiteNavigation from "./site_navigation";

import styles from "./site_skeleton.module.scss";
import SiteRibbon from "./site_ribbon";
import { useDispatch, useSelector } from "react-redux";
import uiSlice, { RibbonState } from "@/slices/ui.slice";
import { StoreState } from "@/store/store";

export type SiteSkeletonProps = {
	title: string,
	description: string
}

const SiteSkeleton: FC<React.PropsWithChildren<SiteSkeletonProps>> = props => {
	const ribbon = useSelector<StoreState, RibbonState | null>(s => s.ui.ribbon);
	const [time, setTime] = useState(Date.now() / 1000);

	const dispatch = useDispatch();
	const closeRibbon = () => dispatch(uiSlice.actions.clearRibbon());

	useEffect(() => {
		const intervalFn = () => setTime(Date.now() / 1000);

		const interval = setInterval(intervalFn, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<Head>
				<title>{props.title}</title>
				<meta name="description" content={props.description} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<SiteNavigation />
				<div className={styles.body}>
					<div className={styles.content}>
						{props.children}
					</div>
					<div className={styles.ribbon}>
						{
							(ribbon && (ribbon.expire ? ribbon.expire > time : true)) &&
							<SiteRibbon message={ribbon.message} type={ribbon.type} onClose={closeRibbon} />
						}
					</div>
				</div>
			</main>
		</>
	)
}

export default SiteSkeleton;