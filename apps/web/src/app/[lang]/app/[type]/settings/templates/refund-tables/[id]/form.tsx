"use client";
import {
  $UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderUpdateDto,
  UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto,
} from "@ayasofyazilim/saas/ContractService";
import { SchemaForm } from "@repo/ayasofyazilim-ui/organisms/schema-form";
import { createUiSchemaWithResource } from "@repo/ayasofyazilim-ui/organisms/schema-form/utils";
import { useRouter } from "next/navigation";
import { handlePutResponse } from "src/app/[lang]/app/actions/api-utils-client";
import { putRefundTableHeadersApi } from "src/app/[lang]/app/actions/ContractService/put-actions";
import { ContractServiceResource } from "src/language-data/ContractService";

function Form({
  response,
  languageData,
}: {
  response: UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto;
  languageData: ContractServiceResource;
}) {
  const router = useRouter();
  const uiSchema = createUiSchemaWithResource({
    resources: languageData,
    schema:
      $UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderUpdateDto,
  });
  return (
    <SchemaForm
      fields={{}}
      onSubmit={(data) => {
        const formData = {
          id: response.id,
          requestBody: data.formData,
        };
        void putRefundTableHeadersApi(formData).then((res) =>
          handlePutResponse(res, router),
        );
      }}
      schema={
        $UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderUpdateDto
      }
      formData={response}
      submitText={languageData.Save}
      uiSchema={uiSchema}
    />
  );
}

export default Form;
