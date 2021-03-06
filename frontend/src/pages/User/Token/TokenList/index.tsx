import React, { Component } from "react";
import {Table, Col, Popconfirm, Card, Form, Row, Input, Button, Select, Modal, message} from "antd";
import {addTokenRequest, delTokenRequest, getTokenListRequest, updateTokenRequest} from "@/services/user";
import {getWorkflowList} from "@/services/workflows";

const { Option } = Select;

class TokenList extends Component<any, any> {
  constructor(props) {
    super();
    this.state = {
      tokenResult: [],
      tokenDetail: {},
      workflowResult: [],
      tokenResultLoading: false,
      tokenModalVisible: false,
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10,
        onChange: (current) => {
          const pagination = {...this.state.pagination};
          pagination.page = current;
          pagination.current = current;
          this.setState({pagination}, () => {
            this.fetchTokenList({
              page: pagination.page,
              per_page: pagination.pageSize
            })
          });
        }
      }

    }
  }

  componentDidMount() {
    this.fetchTokenList({per_page:10, page:1});
    this.fetchWorkflowList({per_page:1000, page:1});
  }

  fetchTokenList = async(params: any) => {
    this.setState({tokenResultLoading: true});
    const result = await getTokenListRequest(params);
    if (result.code === 0) {
      const pagination = { ...this.state.pagination };
      pagination.page = result.data.page;
      pagination.pageSize = result.data.per_page;
      pagination.total = result.data.total;

      this.setState({tokenResultLoading: false, tokenResult: result.data.value, pagination})
    }
  }

  fetchWorkflowList = async(params: any) => {
    const result = await getWorkflowList(params);
    console.log(result);
    if (result.code === 0 ) {
      this.setState({workflowResult: result.data.value}, ()=> console.log(this.state.workflowResult))
    }
  }

  searchToken = (values: any) => {
    this.fetchTokenList({...values, per_page:10, page:1});
  }

  showTokenModal = (record: any)=> {
    if (record !== 0 ) {
      this.setState({tokenModalVisible: true, tokenDetail: record})
    } else {
      this.setState({tokenModalVisible: true})
    }
  }

  handleTokenOk = () => {
    this.setState({tokenModalVisible: false, tokenDetail: {}})
  }

  handleTokenCancel = () => {
    this.setState({tokenModalVisible: false, tokenDetail: {}})
  }

  onTokenFinish = async(values) => {
    let result = {};
    values.workflow_ids = values.workflow_ids.join(',');
    if (this.state.tokenDetail && this.state.tokenDetail.id ) {
      result = await updateTokenRequest(this.state.tokenDetail.id, values);
    } else {
      result = await addTokenRequest(values);
    }
    if (result.code === 0) {
      message.success('????????????');
      this.setState({tokenModalVisible: false, tokenDetail: {}});
      this.fetchTokenList({per_page:10, page:1});
    } else {
      message.error(`????????????:${result.msg}`)
    }
  }


  getTokenDetailField = (fieldName:string) =>{
    if(this.state && this.state.tokenDetail && this.state.tokenDetail[fieldName]){
      if (fieldName === 'workflow_ids') {
        return this.state.tokenDetail[fieldName].split(',');
      } else {
        return this.state.tokenDetail[fieldName]
      }
    }
    return ''
  }

  delToken = async(tokenId: number) => {
    const result = await delTokenRequest(tokenId);
    if (result.code ===0 ) {
      message.success('????????????');
      this.fetchTokenList({per_page:10, page:1});
    } else {
      message.error(`????????????:${result.msg}`)
    }

  }

  render() {
    const columns = [
      {
        title: "???????????????",
        dataIndex: "app_name",
        key: "app_name"
      },
      {
        title: "token",
        dataIndex: "token",
        key: "token"
      },
      {
        title: "????????????",
        dataIndex: "ticket_sn_prefix",
        key: "ticket_sn_prefix"
      },
      {
        title: "???????????????",
        dataIndex: "workflow_ids",
        key: "workflow_ids"
      },
      {
        title: "?????????",
        dataIndex: "creator",
        key: "creator"
      },
      {
        title: "????????????",
        dataIndex: "gmt_created",
        key: "gmt_created"
      },
      {
        title: "??????",
        key: "action",
        render: (text: string, record: any) => (
          <span>
            <a style={{marginRight: 16}} onClick={() => this.showTokenModal(record)}>??????</a>
            <a style={{marginRight: 16, color: "red"}}>
              <Popconfirm
                title="???????????????"
                onConfirm={()=>{this.delToken(record.id)}}
              >
                ??????
              </Popconfirm>
            </a>
          </span>
        )
      }
    ]
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
    return (
      <Card>
        <Form
          name="advanced_search"
          className="ant-advanced-search-form"
          onFinish={this.searchToken}
        >
          <Row gutter={24}>
            <Col span={6} key={"search_value"}>
              <Form.Item
                name={"search_value"}
                label={"??????"}
              >
                <Input placeholder="??????????????????????????????" />
              </Form.Item>
            </Col>
            <Col>
              <Button type="primary" htmlType="submit">
                ??????
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" onClick={()=>this.showTokenModal(0)}>
                ??????
              </Button>
            </Col>
          </Row>
        </Form>
        <Table loading={this.state.tokenResultLoading} columns={columns} dataSource={this.state.tokenResult}
               rowKey={record => record.id} pagination={this.state.pagination}/>

        <Modal
          title="????????????"
          visible={this.state.tokenModalVisible}
          onOk={this.handleTokenOk}
          onCancel={this.handleTokenCancel}
          width={800}
          footer={null}
          destroyOnClose
        >
          <Form
            {...layout}
            onFinish={this.onTokenFinish}
          >
            <Form.Item name="app_name" label="????????????" rules={[{ required: true }]} initialValue={this.getTokenDetailField('app_name')}>
              <Input />
            </Form.Item>
            <Form.Item name="ticket_sn_prefix" label="????????????" initialValue={String(this.getTokenDetailField('ticket_sn_prefix'))}>
              <Input />
            </Form.Item>
            <Form.Item name="workflow_ids" label="???????????????" initialValue={this.getTokenDetailField('workflow_ids')}>
              <Select
                allowClear
                showSearch
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="?????????????????????????????????"
              >
                {this.state.workflowResult.map(d => (
                  <Option key={d.id}>{`${d.name}`}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                ??????
              </Button>
            </Form.Item>

          </Form>
        </Modal>
      </Card>

    )
  }
}

export default TokenList;
