import { BasicForm, ApiSelect, FormSchema, FormActionType } from '@/components/Form';
import { CollapseContainer } from '@/components/Container';
import { useMessage } from '@/hooks/web/useMessage';
import { PageWrapper } from '@/components/Page';

import { optionsListApi } from '@/api/demo/select';
import { useDebounceFn } from '@vueuse/core';
import { treeOptionsListApi } from '@/api/demo/tree';
import { Select, type SelectProps } from 'ant-design-vue';
import { cloneDeep } from 'lodash-es';
import { areaRecord } from '@/api/demo/cascader';
import { uploadApi } from '@/api/sys/upload';
import { Recordable } from '#/global';
import { useCreation } from 'ahooks';
import { useRef, useState } from 'react';
import { Button, Form, Input } from 'antd';

const options: Required<SelectProps>['options'] = new Array(10)
  .fill(0)
  .map((_, i) => ({ label: '选项' + i, value: `${i}` }));

const provincesOptions = [
  {
    id: 'guangdong',
    label: '广东省',
    value: '1',
    key: '1',
  },
  {
    id: 'jiangsu',
    label: '江苏省',
    value: '2',
    key: '2',
  },
];
const citiesOptionsData = {
  guangdong: [
    {
      label: '珠海市',
      value: '1',
      key: '1',
    },
    {
      label: '深圳市',
      value: '2',
      key: '2',
    },
    {
      label: '广州市',
      value: '3',
      key: '3',
    },
  ],
  jiangsu: [
    {
      label: '南京市',
      value: '1',
      key: '1',
    },
    {
      label: '无锡市',
      value: '2',
      key: '2',
    },
    {
      label: '苏州市',
      value: '3',
      key: '3',
    },
  ],
};

const BasicExample = () => {
  const formRef = useRef<FormActionType<any>>(null);

  const [valueSelectA, setValueSelectA] = useState<string[]>([]);
  const [valueSelectB, setValueSelectB] = useState<string[]>([]);

  const optionsA = useCreation(() => {
    return cloneDeep(options).map((op) => {
      op.disabled = valueSelectA.indexOf(op.value as string) !== -1;
      return op;
    });
  }, [valueSelectB]);
  const optionsB = useCreation(() => {
    return cloneDeep(options).map((op) => {
      op.disabled = valueSelectB.indexOf(op.value as string) !== -1;
      return op;
    });
  }, [valueSelectB]);

  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '基础字段',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'field1',
      component: 'Input',
      required: true,
      label: ({ field }) => {
        return `字段1-${field}`;
      },
      colProps: {
        span: 8,
      },
      componentProps: ({ schema }) => {
        console.log('form:', schema);
        return {
          placeholder: '自定义placeholder',
          onChange: (e: any) => {
            console.log(e);
          },
          suffix: 'sSlot',
          prefix: 'pSlot',
        };
      },
    },
    {
      field: 'field2',
      component: 'Input',
      required: true,
      label: '带后缀',
      defaultValue: '111',
      colProps: {
        span: 8,
      },
      componentProps: {
        onChange: (e: any) => {
          console.log(e);
        },
      },
      suffix: '天',
    },
    {
      field: 'fieldsc',
      component: 'Upload',
      label: '上传',
      colProps: {
        span: 8,
      },
      rules: [{ required: true, message: '请选择上传文件' }],
      componentProps: {
        api: uploadApi,
      },
    },
    // {
    //   field: 'field3',
    //   component: 'DatePicker',
    //   label: '字段3',
    //   colProps: {
    //     span: 8,
    //   },
    // },
    // {
    //   field: 'field4',
    //   component: 'Select',
    //   label: '字段4',
    //   colProps: {
    //     span: 8,
    //   },
    //   componentProps: {
    //     options: [
    //       {
    //         label: '选项1',
    //         value: '1',
    //         key: '1',
    //       },
    //       {
    //         label: '选项2',
    //         value: '2',
    //         key: '2',
    //       },
    //     ],
    //   },
    // },
    // {
    //   field: 'field5',
    //   component: 'CheckboxGroup',
    //   label: '字段5',
    //   colProps: {
    //     span: 8,
    //   },
    //   componentProps: {
    //     options: [
    //       {
    //         label: '选项1',
    //         value: '1',
    //       },
    //       {
    //         label: '选项2',
    //         value: '2',
    //       },
    //     ],
    //   },
    // },
    // {
    //   field: 'field7',
    //   component: 'RadioGroup',
    //   label: '字段7',
    //   colProps: {
    //     span: 8,
    //   },
    //   componentProps: {
    //     options: [
    //       {
    //         label: '选项1',
    //         value: '1',
    //       },
    //       {
    //         label: '选项2',
    //         value: '2',
    //       },
    //     ],
    //   },
    // },
    // {
    //   field: 'field8',
    //   component: 'Checkbox',
    //   label: '字段8',
    //   colProps: {
    //     span: 8,
    //   },
    //   renderComponentContent: 'Check',
    // },
    // {
    //   field: 'field9',
    //   component: 'Switch',
    //   label: '字段9',
    //   colProps: {
    //     span: 8,
    //   },
    // },
    // {
    //   field: 'field10',
    //   component: 'RadioButtonGroup',
    //   label: '字段10',
    //   colProps: {
    //     span: 8,
    //   },
    //   componentProps: {
    //     options: [
    //       {
    //         label: '选项1',
    //         value: '1',
    //       },
    //       {
    //         label: '选项2',
    //         value: '2',
    //       },
    //     ],
    //     onChange: (e) => {
    //       console.log(e);
    //     },
    //   },
    // },
    // {
    //   field: 'field11',
    //   component: 'Cascader',
    //   label: '字段11',
    //   colProps: {
    //     span: 8,
    //   },
    //   componentProps: {
    //     options: [
    //       {
    //         value: 'zhejiang',
    //         label: 'Zhejiang',
    //         children: [
    //           {
    //             value: 'hangzhou',
    //             label: 'Hangzhou',
    //             children: [
    //               {
    //                 value: 'xihu',
    //                 label: 'West Lake',
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //       {
    //         value: 'jiangsu',
    //         label: 'Jiangsu',
    //         children: [
    //           {
    //             value: 'nanjing',
    //             label: 'Nanjing',
    //             children: [
    //               {
    //                 value: 'zhonghuamen',
    //                 label: 'Zhong Hua Men',
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
    // {
    //   field: 'field12',
    //   component: 'BasicTitle',
    //   label: '标题区分',
    //   componentProps: {
    //     // line: true,
    //     span: true,
    //   },
    //   colProps: {
    //     span: 24,
    //   },
    // },
    // {
    //   field: 'field13',
    //   component: 'CropperAvatar',
    //   label: '头像上传',
    //   colProps: {
    //     span: 8,
    //   },
    // },
    // {
    //   field: 'field14',
    //   component: 'Transfer',
    //   label: '穿梭框',
    //   colProps: {
    //     span: 8,
    //   },
    //   componentProps: {
    //     render: (item) => item.label,
    //     dataSource: citiesOptionsData.guangdong,
    //     targetKeys: ['1'],
    //   },
    // },
    // {
    //   field: 'divider-api-select',
    //   component: 'Divider',
    //   label: '远程下拉演示',
    //   colProps: {
    //     span: 24,
    //   },
    // },
    // {
    //   field: 'field30',
    //   component: 'ApiSelect',
    //   label: '懒加载远程下拉',
    //   required: true,
    //   componentProps: {
    //     // more details see /src/components/Form/src/components/ApiSelect.vue
    //     api: optionsListApi,
    //     params: {
    //       id: 1,
    //     },

    //     resultField: 'list',
    //     // use name as label
    //     labelField: 'name',
    //     // use id as value
    //     valueField: 'id',
    //     // not request untill to select
    //     immediate: true,
    //     onChange: (e, v) => {
    //       console.log('ApiSelect====>:', e, v);
    //     },
    //     // atfer request callback
    //     onOptionsChange: (options) => {
    //       console.log('get options', options.length, options);
    //     },
    //   },
    //   colProps: {
    //     span: 8,
    //   },
    //   defaultValue: '0',
    // },
    // {
    //   field: 'field8',
    //   component: 'ApiCascader',
    //   label: '联动ApiCascader',
    //   required: true,
    //   colProps: {
    //     span: 8,
    //   },
    //   componentProps: {
    //     api: areaRecord,
    //     apiParamKey: 'parentCode',
    //     // dataField: 'data',
    //     labelField: 'name',
    //     valueField: 'code',
    //     initFetchParams: {
    //       parentCode: '',
    //     },
    //     isLeaf: (record) => {
    //       return !(record.levelType < 3);
    //     },
    //     onChange: (e, ...v) => {
    //       console.log('ApiCascader====>:', e, v);
    //     },
    //   },
    // },
    // {
    //   field: 'field31',
    //   // component: 'Input',
    //   label: '下拉本地搜索',
    //   helpMessage: ['ApiSelect组件', '远程数据源本地搜索', '只发起一次请求获取所有选项'],
    //   required: true,
    //   slot: 'localSearch',
    //   colProps: {
    //     span: 8,
    //   },
    //   defaultValue: '0',
    //   componentProps: {
    //     onOptionsChange() {},
    //   },
    // },
    // {
    //   field: 'field32',
    //   // component: 'Input',
    //   label: '下拉远程搜索',
    //   helpMessage: ['ApiSelect组件', '将关键词发送到接口进行远程搜索'],
    //   required: true,
    //   slot: 'remoteSearch',
    //   colProps: {
    //     span: 8,
    //   },
    //   defaultValue: '0',
    // },
    // {
    //   field: 'field33',
    //   component: 'ApiTreeSelect',
    //   label: '远程下拉树',
    //   helpMessage: ['ApiTreeSelect组件', '使用接口提供的数据生成选项'],
    //   required: true,
    //   componentProps: {
    //     api: treeOptionsListApi,
    //     resultField: 'list',
    //     onChange: (e, v) => {
    //       console.log('ApiTreeSelect====>:', e, v);
    //     },
    //   },
    //   colProps: {
    //     span: 8,
    //   },
    // },
    // {
    //   field: 'field33',
    //   component: 'ApiTreeSelect',
    //   label: '远程懒加载下拉树',
    //   helpMessage: ['ApiTreeSelect组件', '使用接口提供的数据生成选项'],
    //   required: true,
    //   componentProps: {
    //     api: () => {
    //       return new Promise((resolve) => {
    //         resolve([
    //           {
    //             title: 'Parent Node',
    //             value: '0-0',
    //           },
    //         ]);
    //       });
    //     },
    //     async: true,
    //     onChange: (e, v) => {
    //       console.log('ApiTreeSelect====>:', e, v);
    //     },
    //     onLoadData: ({ treeData, resolve, treeNode }) => {
    //       console.log('treeNode====>:', treeNode);
    //       setTimeout(() => {
    //         const children: Recordable[] = [
    //           { title: `Child Node ${treeNode.eventKey}-0`, value: `${treeNode.eventKey}-0` },
    //           { title: `Child Node ${treeNode.eventKey}-1`, value: `${treeNode.eventKey}-1` },
    //         ];
    //         children.forEach((item) => {
    //           item.isLeaf = false;
    //           item.children = [];
    //         });
    //         treeNode.dataRef.children = children;
    //         treeData.value = [...treeData.value];
    //         resolve();
    //         return;
    //       }, 300);
    //     },
    //   },
    //   colProps: {
    //     span: 8,
    //   },
    // },
    // {
    //   field: 'field34',
    //   component: 'ApiRadioGroup',
    //   label: '远程Radio',
    //   helpMessage: ['ApiRadioGroup组件', '使用接口提供的数据生成选项'],
    //   required: true,
    //   componentProps: {
    //     api: optionsListApi,
    //     params: {
    //       count: 2,
    //     },
    //     resultField: 'list',
    //     // use name as label
    //     labelField: 'name',
    //     // use id as value
    //     valueField: 'id',
    //   },
    //   defaultValue: '1',
    //   colProps: {
    //     span: 8,
    //   },
    // },
    // {
    //   field: 'field35',
    //   component: 'ApiRadioGroup',
    //   label: '远程Radio',
    //   helpMessage: ['ApiRadioGroup组件', '使用接口提供的数据生成选项'],
    //   required: true,
    //   componentProps: {
    //     api: optionsListApi,
    //     params: {
    //       count: 2,
    //     },
    //     resultField: 'list',
    //     // use name as label
    //     labelField: 'name',
    //     // use id as value
    //     valueField: 'id',
    //     isBtn: true,
    //     onChange: (e) => {
    //       console.log('ApiRadioGroup====>:', e);
    //     },
    //   },
    //   colProps: {
    //     span: 8,
    //   },
    // },
    // {
    //   field: 'field36',
    //   component: 'ApiTree',
    //   label: '远程Tree',
    //   helpMessage: ['ApiTree组件', '使用接口提供的数据生成选项'],
    //   required: true,
    //   componentProps: {
    //     api: treeOptionsListApi,
    //     params: {
    //       count: 2,
    //     },
    //     afterFetch: (v) => {
    //       //do something
    //       return v;
    //     },
    //     resultField: 'list',
    //   },
    //   colProps: {
    //     span: 8,
    //   },
    // },
    // {
    //   label: '远程穿梭框',
    //   field: 'field37',
    //   component: 'ApiTransfer',
    //   componentProps: {
    //     render: (item) => item.label,
    //     api: async () => {
    //       return Promise.resolve(citiesOptionsData.guangdong);
    //     },
    //   },
    //   defaultValue: ['1'],
    //   required: true,
    // },
    // {
    //   field: 'divider-linked',
    //   component: 'Divider',
    //   label: '字段联动',
    //   colProps: {
    //     span: 24,
    //   },
    // },
    // {
    //   field: 'province',
    //   component: 'Select',
    //   label: '省份',
    //   colProps: {
    //     span: 8,
    //   },
    //   componentProps: ({ formModel, formActionType }) => {
    //     return {
    //       options: provincesOptions,
    //       placeholder: '省份与城市联动',
    //       onChange: (e: any) => {
    //         // console.log(e)
    //         let citiesOptions =
    //           e == 1
    //             ? citiesOptionsData[provincesOptions[0].id]
    //             : citiesOptionsData[provincesOptions[1].id];
    //         // console.log(citiesOptions)
    //         if (e === undefined) {
    //           citiesOptions = [];
    //         }
    //         formModel.city = undefined; //  reset city value
    //         const { updateSchema } = formActionType;
    //         updateSchema({
    //           field: 'city',
    //           componentProps: {
    //             options: citiesOptions,
    //           },
    //         });
    //       },
    //     };
    //   },
    // },
    // {
    //   field: 'city',
    //   component: 'Select',
    //   label: '城市',
    //   colProps: {
    //     span: 8,
    //   },
    //   componentProps: {
    //     options: [], // defalut []
    //     placeholder: '省份与城市联动',
    //   },
    // },
    // {
    //   field: 'divider-selects',
    //   component: 'Divider',
    //   label: '互斥多选',
    //   helpMessage: ['两个Select共用数据源', '但不可选择对方已选中的项目'],
    //   colProps: {
    //     span: 24,
    //   },
    // },
    // {
    //   field: 'selectA',
    //   // component: 'Select',
    //   label: '互斥SelectA',
    //   slot: 'selectA',
    //   defaultValue: [],
    //   colProps: {
    //     span: 8,
    //   },
    // },
    // {
    //   field: 'selectB',
    //   // component: 'Select',
    //   label: '互斥SelectB',
    //   slot: 'selectB',
    //   defaultValue: [],
    //   colProps: {
    //     span: 8,
    //   },
    // },
    // {
    //   field: 'divider-deconstruct',
    //   component: 'Divider',
    //   label: '字段解构',
    //   helpMessage: ['如果组件的值是 array 或者 object', '可以根据 ES6 的解构语法分别取值'],
    //   colProps: {
    //     span: 24,
    //   },
    // },
    // {
    //   field: '[startTime, endTime]',
    //   label: '时间范围',
    //   component: 'TimeRangePicker',
    //   componentProps: {
    //     format: 'HH:mm:ss',
    //     placeholder: ['开始时间', '结束时间'],
    //   },
    // },
    // {
    //   field: '[startDate, endDate]',
    //   label: '日期范围',
    //   component: 'RangePicker',
    //   componentProps: {
    //     format: 'YYYY-MM-DD',
    //     placeholder: ['开始日期', '结束日期'],
    //   },
    // },
    // {
    //   field: '[startDateTime, endDateTime]',
    //   label: '日期时间范围',
    //   component: 'RangePicker',
    //   componentProps: {
    //     format: 'YYYY-MM-DD HH:mm:ss',
    //     placeholder: ['开始日期、时间', '结束日期、时间'],
    //     showTime: { format: 'HH:mm:ss' },
    //   },
    // },
    // {
    //   field: 'divider-others',
    //   component: 'Divider',
    //   label: '其它',
    //   colProps: {
    //     span: 24,
    //   },
    // },
    // {
    //   field: 'field20',
    //   component: 'InputNumber',
    //   label: '字段20',
    //   required: true,
    //   colProps: {
    //     span: 8,
    //   },
    // },
    // {
    //   field: 'field21',
    //   component: 'Slider',
    //   label: '字段21',
    //   componentProps: {
    //     min: 0,
    //     max: 100,
    //     range: true,
    //     marks: {
    //       20: '20°C',
    //       60: '60°C',
    //     },
    //   },
    //   colProps: {
    //     span: 8,
    //   },
    // },
    // {
    //   field: 'field22',
    //   component: 'Rate',
    //   label: '字段22',
    //   defaultValue: 3,
    //   colProps: {
    //     span: 8,
    //   },
    //   componentProps: {
    //     disabled: false,
    //     allowHalf: true,
    //   },
    // },
    // {
    //   field: 'field23',
    //   component: 'ImageUpload',
    //   label: '上传图片',
    //   required: true,
    //   defaultValue: [
    //     'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   ],
    //   componentProps: {
    //     api: uploadApi,
    //     accept: ['png', 'jpeg', 'jpg'],
    //     maxSize: 2,
    //     maxNumber: 1,
    //   },
    // },
  ];

  const { createMessage } = useMessage();
  const [keyword, setKeyword] = useState<string>('');
  const onSearch = (value: string) => {
    setKeyword(value);
  };

  const handleReset = () => {
    setKeyword('');
  };

  const handleSubmit = (values: any) => {
    console.log('values', values);
    createMessage.success('click search,values:' + JSON.stringify(values));
  };

  const click = () => {
    console.log(formRef.current);
    formRef.current?.setFieldsValue({
      field1: '888',
      field2: '999',
    });
  };

  return (
    <PageWrapper title="表单基础示例" contentFullHeight>
      <CollapseContainer title="基础示例">
        <Button onClick={click}>点击</Button>
        <BasicForm
          ref={formRef}
          autoFocusFirstItem
          labelWidth={200}
          schemas={schemas}
          actionColOptions={{ span: 24 }}
          onSubmit={handleSubmit}
          onReset={handleReset}
        ></BasicForm>
      </CollapseContainer>
    </PageWrapper>
  );
};

export default BasicExample;
