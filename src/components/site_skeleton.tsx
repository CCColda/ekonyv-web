import Head from "next/head";
import { FC, useEffect, useState } from "react";

import SiteNavigation from "./site_navigation";

import styles from "./site_skeleton.module.scss";
import SiteRibbon from "./site_ribbon";
import { useDispatch, useSelector } from "react-redux";
import uiSlice, { RibbonState } from "@/redux/slices/ui.slice";
import { StoreState } from "@/redux/store";
import { checkConnection } from "@/redux/slices/connection.slice";
import { Address } from "@/types/server";
import AppState from "./app_state";

export type SiteSkeletonProps = {
	title: string,
	description: string
}

const SiteSkeleton: FC<React.PropsWithChildren<SiteSkeletonProps>> = props => {
	const ribbon = useSelector<StoreState, RibbonState | null>(s => s.ui.ribbon);
	const address = useSelector<StoreState, Address | null>(s => s.connection.address);

	const dispatch = useDispatch();
	const closeRibbon = () => dispatch(uiSlice.actions.clearRibbon());

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