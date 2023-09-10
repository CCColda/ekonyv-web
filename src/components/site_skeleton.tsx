import Head from "next/head";
import { FC } from "react";

import SiteNavigation from "./site_navigation";

import styles from "./site_skeleton.module.scss";

export type SiteSkeletonProps = {
	title: string,
	description: string
}

const SiteSkeleton: FC<React.PropsWithChildren<SiteSkeletonProps>> = props => {
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
				<div className={styles.content}>
					{props.children}
				</div>
			</main>
		</>
	)
}

export default SiteSkeleton;