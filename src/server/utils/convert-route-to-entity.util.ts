const mapping: Record<string, string> = {
  organizations: 'organization',
  'recurring-deposits': 'recurring_deposit',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
