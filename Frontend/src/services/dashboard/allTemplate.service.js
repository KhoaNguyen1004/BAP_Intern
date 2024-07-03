import { GetAllTemplateCaller} from "./caller";

class TemplateService {
    async useGetAllTemplate() {
        try {
            const response = await GetAllTemplateCaller();
            return response.data;
        } catch (error) {
            throw error.response.data.message || 'Failed to get all template';
        }
    }
}

export default new TemplateService();