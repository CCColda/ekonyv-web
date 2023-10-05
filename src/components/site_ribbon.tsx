import { ReactNode } from "react";
import styles from "./site_ribbon.module.scss";
import IconBookshelf from "@/icons/bookshelf";
import IconCrossCircled from "@/icons/cross-circled";
import IconExclamationTriangleFill from "@/icons/exclamation-triangle-fill";

export type SiteRibbonProps = {
	type: "error" | "warning" | "info",
	message: string,
	onClose: MaybePromise<() => any>
};

const SiteRibbon: React.FC<SiteRibbonProps> = (props) => {
	const icons: Record<SiteRibbonProps["type"], ReactNode> = {
		info: <IconBookshelf />,
		error: <IconCrossCircled />,
		warning: <IconExclamationTriangleFill />
	};

	return <div className={[styles.ribbon, styles[props.type]].join(' ')}>
		<div className={styles.message}>
			{icons[props.type]}
			<span>{props.message}</span>
		</div>
		<button className={styles.close} onClick={ev => props.onClose()}>bezárás</button>
	</div>
};

export default SiteRibbon;
