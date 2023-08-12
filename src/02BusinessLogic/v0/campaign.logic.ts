import * as Campaign from '@interfaces/campaign.interface';
import * as DB from '../../03data/v0/campaign.mongo';
import { convertUserId } from '../../03data/v0/convertUserId';
import { HttpReplyMessage } from '@interfaces/responses.interface'


export async function createCampaign(userId: string, campaignPost: Campaign.CampaignHttp): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    const campaign: Campaign.Campaign = {
        _user_id: db_uuid,
        ...campaignPost
    }
    const reply: HttpReplyMessage = await DB.createCampaign(campaign);
    return reply
}

export async function getCampaign(userId: string, campaignId: string): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    console.log("Converted Id = ",db_uuid)
    const reply: HttpReplyMessage = await DB.retrieveCampaign(db_uuid, campaignId)
    return reply
}

export async function getAllCampaigns(user_id: string): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(user_id)
    console.log("Converted Id = ",db_uuid)
    const reply: HttpReplyMessage = await DB.retrieveAllCampaigns(db_uuid)
    return reply
}

export async function patchCampaign(userId: string, campaignId: string, update: Campaign.CampaignPatch): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    const reply: HttpReplyMessage = await DB.updateCampaign(db_uuid,campaignId,update)
    return reply
}

export async function deleteCampaign(userId: string, campaignId: string): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    const reply: HttpReplyMessage = await DB.deleteCampaign(db_uuid, campaignId)
    return reply
}