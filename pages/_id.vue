<template>
  <div
    v-if="content"
    class="dynamic-page"
  >
    <render-content :content="content" />
  </div>
</template>

<script>
import { useRoute } from '@nuxtjs/composition-api';
import { useContent } from '@vsf-enterprise/contentful';
import { onSSR, useVSFContext } from '@vue-storefront/core';
import Vue from 'vue';
/*
 * This page is prepared for CMS dynamic content rendering.
 */
export default Vue.extend({
  name: 'CMSDynamicPage',
  setup (_props) {
    const route = useRoute();
    const { i18n: { locale } } = useVSFContext();
    const id = route.value.params.id;
    const { search, content } = useContent(id);
    onSSR(async () => {
      await search({
        url: id,
        locale,
        preview: route.value.query.preview,
      });
    });
    return {
      content,
    
    };
  },
});
</script>

<style lang="scss">
.dynamic-page .render-content {
  width: 100%;
  margin: 0 auto;
  margin-bottom: var(--spacer-xl);
}

.sf-banner {
  ::v-deep .sf-banner__title {
    width: 60%;
    text-transform: none;
    font: var(--font-weight--semibold) var(--h2-font-size)/1.2 var(--font-family--secondary);
    padding-top: var(--spacer-sm);
  }
  ::v-deep .sf-banner__subtitle {
    font: var(--font-weight--normal) var(--h6-font-size)/1.4 var(--font-family--secondary);
    color: var(--c-gray);
  }
  @include for-desktop {
    margin: var(--spacer-xl) auto var(--spacer-2xl);
    min-height: 586px;
  }
  @include for-mobile {
    margin: var(--spacer-xl) auto var(--spacer-lg);
    min-height: 230px;
    --banner-background-position: 30%;
    ::v-deep .sf-banner__subtitle,
    ::v-deep .sf-banner__title {
      width: 60%;
      text-align: left;
      white-space: normal;
    }
    ::v-deep .sf-banner__wrapper {
      padding: var(--spacer-xl) var(--spacer-sm) 0;
    }
  }
}

.banner-grid {
  --banner-container-width: 50%;
  margin: var(--spacer-xl) 0;
  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }
  @include for-desktop {
    margin: var(--spacer-2xl) 0;
    ::v-deep .sf-link {
      --button-width: auto;
      text-decoration: none;
    }
  }
}

.banner {
  &__tshirt {
    background-position: left;
  }
  &-central {
    @include for-desktop {
      --banner-container-flex: 0 0 70%;
    }
  }
}

.similar-products {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacer-2xs);
  --heading-padding: 0;
  border-bottom: 1px var(--c-light) solid;
  @include for-desktop {
    border-bottom: 0;
    justify-content: center;
    padding-bottom: 0;
  }
}

.call-to-action {
  background-position: right;
  margin: var(--spacer-xs) 0;
  @include for-desktop {
    margin: var(--spacer-xl) 0 var(--spacer-2xl) 0;
  }
}

.carousel {
  margin: 0 calc(0 - var(--spacer-sm)) 0 0;
  @include for-desktop {
    margin: 0;
  }
  &__item {
    margin: 1.375rem 0 2.5rem 0;
    @include for-desktop {
      margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
    }
    &__product {
      display: flex;
      justify-content: center;
      --product-card-add-button-transform: translate3d(0, 30%, 0);
      ::v-deep .sf-product-card {
        &__title {
          margin: var(--spacer-base) 0 var(--spacer-xs) 0;
        }
        &__add-button {
          margin-bottom: var(--spacer-xl);
        }
      }
    }
  }
  ::v-deep .sf-arrow--long .sf-arrow--right {
    --arrow-icon-transform: rotate(180deg);
    -webkit-transform-origin: center;
    transform-origin: center;
  }
}

::v-deep .sf-banner__wrapper-desktop{
  margin-left: 50px;
}
</style>