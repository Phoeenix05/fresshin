export type User = (Ok)

export type Ok = {
    playerInfo: PlayerInfo
    avatarInfoList: []
    ttl: number
    uid: string
}

export type PlayerInfo = {
    nickname: string
    signature: string
    worldLevel: number
    namecardId: number
    finishAchievementNum: number
    towerFloorIndex: number
    towerLevelIndex: number
    showAvatarInfoList: AvatarInfo[]
    showNameCardIdList: number[]
}

export type AvatarInfo = {
    avatarId: number
    level: number
    costumeId?: number
}
