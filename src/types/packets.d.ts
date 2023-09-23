export type StatePacketKeys = "state";

export type LoginPacketKeys = "token" | "refresh" | "expire";
export type RenewPacketKeys = LoginPacketKeys;
export type LogoutPacketKeys = StatePacketKeys;
export type LogoutEverywherePacketKeys = StatePacketKeys;


export type ReqCodePacketKeys = "state" | "expire";
export type RegisterPacketKeys = "state" | "reason";

export type StatusPacketKeys = "NAME" | "VERSION" | "IP" | "MAC" | "DHCP" | "TIME_STRING" | "TIME_SINCE_EPOCH" | "TIME_SINCE_DEVICE_EPOCH" | "SD";
export type EKonyvPacketKeys = "name" | "version";

export type KeyValuePacket<T> = Record<T, string>;
