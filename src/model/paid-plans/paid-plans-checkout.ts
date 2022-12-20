import { PublicPlan } from '@model/paid-plans/types';

const checkoutUrlBase = new URL(
  decodeURIComponent(process.env.NEXT_PUBLIC_PAID_PLANS_CHECKOUT_URL!)
);

export const getCheckoutUrl = (plan: PublicPlan) => {
  const url = new URL(checkoutUrlBase);
  const data = btoa(JSON.stringify({ integrationData: {}, planId: plan.id }));
  url.pathname += data;
  return url.toString();
};
