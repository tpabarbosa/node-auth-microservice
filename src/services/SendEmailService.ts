import BaseAppService from '../baseClasses/BaseAppService';

export type EmailDTO = {
    type: string;
    data: any;
};

export default class SendEmailService extends BaseAppService<EmailDTO> {
    public async executer({ data, type }: EmailDTO): Promise<void> {
        console.log('email sent');
        console.log('type', type);
        console.log('data', data);
    }
}
