import { FC, MouseEventHandler } from "react";
import { useRouter } from "next/router";

import IconBxLeftArrowCircle from "@/icons/bx-left-arrow-circle";

import styles from "./navigation.module.scss";

export type NavigationLinkData = {
	text: React.ReactNode,
	icon?: React.ReactNode,
	disabled?: boolean,
	action: string | MaybePromise<() => any>;
}

export type NavigationProps = {
	topLinks: NavigationLinkData[],
	bottomLinks: NavigationLinkData[],
	header?: React.ReactNode,
	collapsed?: boolean,
	setCollapsed: (collapsed: boolean) => any
};

type NavigationLinkProps = NavigationLinkData & {
	collapsed?: boolean,
};

const NavigationLink: FC<NavigationLinkProps> = props => {
	const router = useRouter();

	const onClick: MouseEventHandler<HTMLDivElement> = async (e) => {
		e.preventDefault();
		if (props.disabled) return;

		if (typeof props.action == "string")
			router.push(props.action);
		else
			await props.action();
	};

	return <div className={[styles.navigation_link, props.disabled ? styles.disabled : ''].join(' ')} onClick={onClick}>
		<span className={styles.icon}>
			{props.icon}
		</span>
		{
			!props.collapsed &&
			<span className={styles.text}>{props.text}</span>
		}
	</div>
};

const Navigation: FC<NavigationProps> = props => {
	const collapseButton = <NavigationLink
		text="Bezárás"
		icon={<IconBxLeftArrowCircle />}
		action={() => props.setCollapsed(!props.collapsed)}
		collapsed={props.collapsed} />;

	return <div className={[styles.navigation, props.collapsed ? styles.collapsed : ''].join(' ')}>
		<div className={styles.header}>
			{
				!props.collapsed &&
				props.header
			}
		</div>
		<div className={styles.navigation_items}>
			<div className={styles.top}>
				{props.topLinks.map((v, i) => <NavigationLink {...v} collapsed={props.collapsed} key={i} />)}
			</div>
			<div className={styles.bottom}>
				{props.bottomLinks.map((v, i) => <NavigationLink {...v} collapsed={props.collapsed} key={i} />)}
			</div>
		</div>
		<div className={styles.footer}>
			{collapseButton}
		</div>
	</div>
}

export default Navigation;