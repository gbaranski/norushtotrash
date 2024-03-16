import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
    return {
        title: url.searchParams.get('title'),
        category: url.searchParams.get('category'),
        description: url.searchParams.get('description'),
    }
};
