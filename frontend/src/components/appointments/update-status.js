import { Modal, Form, Select } from "antd";
import { rules, statuses } from "../../utils/constants";
import { useCallback } from "react";

const UpdateStatus = ({
  isModalOpen,
  handleOk,
  handleCancel,
  appointmentId,
  statusVal,
  setStatusVal,
}) => {
  const handleChangeValues = useCallback(
    (changedValues, { status }) => {
      setStatusVal(status);
    },
    [setStatusVal]
  );

  return (
    <Modal
      title="Change Appointment Status"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        layout="horizontal"
        onValuesChange={handleChangeValues}
      >
        <Form.Item name="status" label="Status" rules={rules} className="mt-30">
          <Select size="large" allowClear defaultValue={statusVal}>
            {statuses &&
              statuses.map((s) => (
                <Select.Option key={s} value={s}>
                  {s}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UpdateStatus;
