import Head from "next/head";
import { FC, MouseEventHandler } from "react";

import SiteNavigation from "./site_navigation";

import styles from "./site_skeleton.module.scss";
import AddBookDialog from "./add_book_dialog";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "@/store/store";
import dialogSlice from "@/slices/dialog.slice";

export type SiteSkeletonProps = {
	title: string,
	description: string
}

const SiteSkeleton: FC<React.PropsWithChildren<SiteSkeletonProps>> = props => {
	const dispatch = useDispatch();
	const dialogShown = useSelector<StoreState, boolean>(state => state.dialog.shown);

	const onDialogClick: MouseEventHandler<HTMLDivElement> = ev => {
		if (!dialogShown)
			return;

		dispatch(dialogSlice.actions.setDialogShown(false));
		ev.preventDefault();
	}

	return (
		<>
			<Head>
				<title>{props.title}</title>
				<meta name="description" content={props.description} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<div className={styles.dialog_backdrop}>
					<SiteNavigation />
					<div className={styles.content}>
						{props.children}
					</div>
				</div>
				{
					dialogShown &&
					<div className={styles.dialog} onClick={onDialogClick}>
						<AddBookDialog />
					</div>
				}
			</main>
		</>
	)
}

export default SiteSkeleton;