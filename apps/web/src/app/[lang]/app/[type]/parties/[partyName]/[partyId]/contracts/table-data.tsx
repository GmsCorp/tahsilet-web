import { tanstackTableCreateColumnsByRowData as columnsByData } from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import type { UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderDetailForMerchantDto as ContractsForMerchantDto } from "@ayasofyazilim/saas/ContractService";
import { $UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderDetailForMerchantDto as $ContractsForMerchantDto } from "@ayasofyazilim/saas/ContractService";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "@/components/ui/sonner";
import type { TanstackTableCreationProps } from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import { CircleCheck } from "lucide-react";
import type { CRMServiceServiceResource } from "src/language-data/CRMService";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { getBaseLink } from "src/utils";
import { postMerchantContractHeaderValidateByHeaderIdApi } from "src/app/[lang]/app/actions/ContractService/post-actions";
import { handlePostResponse } from "src/app/[lang]/app/actions/api-utils-client";

const contractsTableColumns = ({
  languageData,
  lang,
  partyName,
  partyId,
}: {
  languageData: CRMServiceServiceResource & ContractServiceResource;
  lang: string;
  partyName: "merchants";
  partyId: string;
}) => {
  return columnsByData<ContractsForMerchantDto>({
    rows: $ContractsForMerchantDto.properties,
    config: { locale: lang },
    languageData: {
      constantKey: "Contracts",
      languageData,
    },
    badges: {
      name: {
        values: [
          {
            label: languageData["Contracts.draft"],
            conditions: [
              {
                when: (value) => value === true,
                conditionAccessorKey: "isDraft",
              },
            ],
          },
          {
            label: languageData["Contracts.active"],
            conditions: [
              {
                when: (value) => value === true,
                conditionAccessorKey: "isActive",
              },
            ],
          },
        ],
      },
    },
    links: {
      name: {
        prefix: `/app/admin/parties/${partyName}/${partyId}/contracts`,
        targetAccessorKey: "id",
        suffix: "/contract",
      },
    },
    icons: {
      name: {
        icon: OpenInNewWindowIcon,
        position: "before",
      },
    },
  });
};

const contractsTable = (props: {
  languageData: CRMServiceServiceResource & ContractServiceResource;
  partyName: "merchants";
  partyId: string;
  router: AppRouterInstance;
}) => {
  const { languageData, partyName, partyId, router } = props;
  const table: TanstackTableCreationProps<ContractsForMerchantDto> = {
    fillerColumn: "name",
    columnVisibility: {
      type: "show",
      columns: ["name", "validFrom", "validTo"],
    },
    tableActions: [
      {
        type: "simple",
        actionLocation: "table",
        cta: languageData["Contracts.New"],
        onClick: () => {
          router.push(
            getBaseLink(
              `/app/admin/parties/${partyName}/${partyId}/contracts/new/`,
            ),
          );
        },
      },
      {
        type: "simple",
        actionLocation: "table",
        cta: languageData.ExportCSV,
        onClick: () => {
          toast.warning("Not implemented yet");
        },
      },
    ],
    rowActions: [
      {
        type: "simple",
        actionLocation: "row",
        icon: CircleCheck,
        cta: languageData["Contracts.setActive"],
        onClick: (rowData) => {
          void postMerchantContractHeaderValidateByHeaderIdApi(rowData.id).then(
            (response) => {
              handlePostResponse(response, router);
            },
          );
        },
      },
    ],
  };
  return table;
};

export const tableData = {
  columns: contractsTableColumns,
  table: contractsTable,
};
