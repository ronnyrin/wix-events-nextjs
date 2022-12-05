import WixMediaImage from '@app/components/Image/WixMediaImage';
import { ServiceInfoViewModel } from '@model/service/service.mapper';
import { useServiceFormattedPrice } from '@app/hooks/useServiceFormattedPrice';

const ALL_SERVICES_CATEGORY_ID = 'ALL';

export default function ServiceList({
  categoryId,
  services,
}: {
  categoryId?: string;
  services: ServiceInfoViewModel[];
}) {
  const categories = Object.values(
    services.reduce<{
      [id: string]: {
        id: string;
        name: string;
        selected: boolean;
      };
    }>(
      (acc, service) => {
        acc[service.categoryId] = {
          id: service.categoryId,
          name: service.categoryName,
          selected: service.categoryId === categoryId,
        };
        return acc;
      },
      {
        [ALL_SERVICES_CATEGORY_ID]: {
          id: ALL_SERVICES_CATEGORY_ID,
          name: 'All Services',
          selected: !categoryId || categoryId === ALL_SERVICES_CATEGORY_ID,
        },
      }
    )
  );
  const selectedCategoryId = categoryId ?? ALL_SERVICES_CATEGORY_ID;
  const servicesToDisplay = services.filter(
    (service) =>
      selectedCategoryId === ALL_SERVICES_CATEGORY_ID ||
      service.categoryId === selectedCategoryId
  );

  return (
    <>
      <div className="text-sm text-center text-gray-500 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px justify-center">
          <li className="mr-2">
            {categories.length > 1
              ? categories.map((category) => (
                  <a
                    key={category.id}
                    href={`/book-now/category/${category.id}`}
                    aria-current={!!selectedCategoryId}
                    className={`inline-block p-4 rounded-t-lg border-b-2 ${
                      category.selected
                        ? 'active text-blue-600 border-blue-600'
                        : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {category.name}
                  </a>
                ))
              : null}
          </li>
        </ul>
      </div>
      <div className="my-3 container m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {servicesToDisplay.map((service, index) => (
          <ServiceCard service={service} key={service.id} />
        ))}
      </div>
    </>
  );
}

const ServiceCard = ({ service }: { service: ServiceInfoViewModel }) => {
  const formattedPrice = useServiceFormattedPrice(
    service!.payment!.paymentDetails
  );

  return (
    <div className="max-w-sm rounded overflow-hidden mx-auto">
      <a href={`/service/${service.slug}`}>
        <WixMediaImage
          media={service.info.media.mainMedia}
          width={640}
          height={320}
        />
      </a>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{service.info.name}</div>
        <p className="text-gray-700 text-base">{service.info.tagLine}</p>
        <p className="text-gray-700 text-base">
          {formattedPrice.userFormattedPrice}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <a
          href={`/calendar/${service.slug}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Book Now
        </a>
      </div>
    </div>
  );
};
