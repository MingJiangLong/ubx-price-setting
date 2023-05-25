<script setup lang="ts">
import IVMService from "@/api/service/IVMService"
import RetailPriceService from "@/api/service/RetailPriceService"
import Button from "@/components/Button.vue"
import Card from "@/components/Card.vue"
import PageContainer from "@/components/PageContainer.vue"
import UboxH14 from "@/components/UboxH14.vue"
import UboxH16 from "@/components/UboxH16.vue"
import UboxH18 from "@/components/UboxH18.vue"
import useAdviceRetailPriceForm from "@/store/modules/useAdviceRetailPriceForm"
import useCommonData from "@/store/modules/useCommonData"
import useRetailPriceForm from "@/store/modules/useRetailPriceForm"
import { Search, Popup, showToast, Space, showSuccessToast } from "vant"
import { isNumeric } from "vant/lib/utils"
import { onMounted } from "vue"
import { reactive } from "vue"
import { ref } from "vue"
import { watchEffect, watch } from "vue"
import { useRouter } from "vue-router"
const props = defineProps<{
  /**
   * 判断是否来自建议零售价页面
   */
  isFromAdviceRetailPrice?: boolean
}>()
const commonData = useCommonData()
const retailForm = useRetailPriceForm()
const adviceRetailForm = useAdviceRetailPriceForm()
let showAddModal = ref(false)
let selectGoods = reactive({ value: null })
const router = useRouter()
/**
 * 是否来自建议零售价页面
 */
const isFromAdviceRetailPrice = props.isFromAdviceRetailPrice ?? false
const price = ref("")
const basePrice = ref("") // 成本价
const adviceRetailPrice = ref("") //零售价
// 搜索节流
const timer = reactive({ value: null })
watch(
  () => commonData.searchValueOfGoods,
  () => {
    if (timer.value) {
      clearTimeout(timer.value)
    }
    timer.value = setTimeout(async () => {
      await commonData.fetchGoodsBySearchValue()
      clearTimeout(timer.value)
      timer.value = null
    }, 600)
  }
)

/**
 * 是否存在SAP合约价格
 * @param id
 */
async function isExistSapPrice(id) {
  const result = await RetailPriceService.fetchAdviceRetailPrice(
    id,
    adviceRetailForm.orgId
  )
  if (result?.code != 1) throw new Error(result?.msg)
  if (result?.data?.list?.[0]?.type == 2) return true
  return false
}

/**
 * 添加按钮点击事件
 * @param item
 */
async function onAddBtnClick(item) {
  try {
    if (isFromAdviceRetailPrice) {
      const isExistSapPriceTag = await isExistSapPrice(item.id)
      if (isExistSapPriceTag)
        return showToast("商品存在合约价,不能申请建议零售价")
    }

    showAddModal.value = true
    selectGoods.value = item
  } catch (error) {
    showToast(error?.message)
  }
}

function isValidPrice(value) {
  if (!isNumeric(value)) return false
  if (+value <= 0) return false
  const arr = `${value ?? ""}`.split(".")
  if (arr.length >= 2 && arr[1].length > 2) return false
  return true
}

function onUpdatePriceConfirm(item) {
  const priceValue = price.value
  const costPrice = basePrice.value
  const retailValue = adviceRetailPrice.value

  // 零售价价格范围判断
  if (!isValidPrice(priceValue) && !isFromAdviceRetailPrice)
    return showToast("请输入大于0的商品价格,最多包含两位小数")

  // 建议零售价成本范围
  if (!isValidPrice(costPrice) && isFromAdviceRetailPrice)
    return showToast("请输入大于0的商品成本价格,最多包含两位小数")

  // 建议零售价校验
  if (!isValidPrice(retailValue) && isFromAdviceRetailPrice)
    return showToast("请输入大于0的商品建议零售价,最多包含两位小数")

  // 零售价支持纸硬币0.5校验
  if (
    retailForm.isPaperCoinAble &&
    !!(+priceValue % 0.5) &&
    !isFromAdviceRetailPrice
  )
    return showToast("所选机器存在纸硬币器，商品价格需为0.5的倍数")

  if (isFromAdviceRetailPrice) {
    let find = adviceRetailForm.productInfoList.find(v => v.id == item.id)
    if (find) {
      return showToast(`商品：${find.full_name}重复配置，每个商品只能配置一条!`)
    }
    adviceRetailForm.addGoods({
      ...item,
      costPrice: basePrice,
      retailPrice: adviceRetailPrice,
    })
  } else {
    let find = retailForm.goods.find(v => v.id == item.id)
    if (find) {
      return showToast(`商品：${find.full_name}重复配置，每个商品只能配置一条!`)
    }
    retailForm.addGoods({
      ...item,
      price: priceValue,
    })
  }

  showAddModal.value = false
  showSuccessToast("添加成功")
  router.back()
}

onMounted(() => {
  if (timer.value) {
    clearTimeout(timer.value)
    timer.value = null
  }
})
</script>
<template>
  <PageContainer>
    <Popup v-model:show="showAddModal">
      <div class="price-adjust-modal">
        <div class="price-adjust-modal-title">商品调价</div>
        <Row align="center" class="popup-main">
          <img :src="selectGoods.value?.product_img" class="goods-img" />
          <Col span="16" offset="1">
            <Row>
              <UboxH16> {{ selectGoods.value?.full_name }}</UboxH16>
            </Row>
            <Row>
              <UboxH14 color="#737373"
                >商品ID:{{ selectGoods.value?.id }}</UboxH14
              >
            </Row>
          </Col>
        </Row>
        <Row
          align="center"
          class="pam-input-container"
          v-if="!isFromAdviceRetailPrice"
        >
          <Col span="2" style="text-align: center">¥</Col>
          <Col span="22">
            <input
              class="price-adjust-modal-input"
              v-model="price"
              placeholder="请填写调整价格"
            />
          </Col>
        </Row>
        <Row
          align="center"
          class="pam-input-container"
          v-if="isFromAdviceRetailPrice"
        >
          <Col span="2" style="text-align: center">¥</Col>
          <Col span="22">
            <input
              class="price-adjust-modal-input"
              v-model="basePrice"
              placeholder="请填写成本价"
            />
          </Col>
        </Row>
        <Row
          align="center"
          class="pam-input-container"
          v-if="isFromAdviceRetailPrice"
        >
          <Col span="2" style="text-align: center">¥</Col>
          <Col span="22">
            <input
              class="price-adjust-modal-input"
              v-model="adviceRetailPrice"
              placeholder="请填写建议零售价"
            />
          </Col>
        </Row>
        <Row gutter="20" class="popup-footer">
          <Col span="12">
            <Button
              @click="showAddModal = false"
              :containerStyle="{ background: '#F4F6F8' }"
            >
              <UboxH16 color="#737373">取消</UboxH16>
            </Button>
          </Col>
          <Col span="12">
            <Button @click="onUpdatePriceConfirm({ ...selectGoods.value })">
              <UboxH16 color="#ffffff">确认</UboxH16>
            </Button>
          </Col>
        </Row>
      </div>
    </Popup>
    <Search
      placeholder="请输入商品ID或者商品名称搜索"
      v-model:model-value="commonData.searchValueOfGoods"
    />
    <div
      v-if="!commonData.goods.length"
      class="empty-container"
      style="flex: 1"
    >
      <img src="../../assets/images/empty_goods.png" class="search-img" />
      <UboxH14 :weight="500">未搜索到商品</UboxH14>
    </div>
    <List style="flex: 1">
      <Card v-for="item in commonData.goods" :key="item.id">
        <Row align="center" class="list-row">
          <img :src="item.product_img" class="goods-img" />
          <!-- </Col> -->
          <Col span="13">
            <Row>
              <UboxH16>{{ item.full_name }}</UboxH16>
            </Row>
            <Row style="padding-top: 5px">
              <UboxH14 color="#737373">商品ID:{{ item.id }}</UboxH14>
            </Row>
          </Col>
          <Col span="5">
            <Button
              @click="onAddBtnClick(item)"
              :containerStyle="{ height: '2.5em' }"
              >添加</Button
            >
          </Col>
        </Row>
      </Card>
    </List>
  </PageContainer>
</template>

<style scoped lang="less">
.search-img {
  width: 150px;
  height: 150px;
}
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  padding-bottom: 32px;
}
.goods-img {
  width: @goods-img;
  height: @goods-img;
  margin-right: 5px;
}
:deep(.van-search__content) {
  border-radius: 1em;
}
.goods-main-font {
  font-size: 1rem;
  font-weight: 500;
  color: #3b3b3b;
}
.goods-sub-font {
  font-size: 0.8rem;
  font-weight: 400;
  color: #737373;
}

.price-adjust-modal {
  width: calc(0.8 * 100vw);
  min-height: calc(0.3 * 100vh);
  background: #ffffff;
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.price-adjust-modal-title {
  font-size: 18px;
  color: #ff7500;
  text-align: center;
  padding: 13px 0;
  background: rgb(255, 240, 227);
  // border-radius: 10px;
}
.price-adjust-modal-input {
  border: none;
  height: 35px;
  color: black;
}
.pam-input-container {
  border: 1px solid #dedede;
  margin: 0 32px;
  border-radius: 8px;
  padding: 2px 5px;
  font-size: 16px;
  margin-bottom: 20px;
}
.list-row {
  margin: 0 10px;
}
.popup-main {
  padding: 21px 24px;
  text-align: left;
}
.popup-footer {
  height: 40px;
  padding: 12px;
}
:deep(.van-popup) {
  background: transparent;
}
</style>
