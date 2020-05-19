<template>
  <div class="invoice-consignee">
    <el-card class="m-b t-l">
      <div class="card-header">
        <h3 class="m-0">Consignee</h3>
      </div>
      <div id="map-consignee" v-if="consignee && consignee.address" class="map"></div>
      <div class="card-content">
        <div v-if="!consignee || !consignee.name">
          <p class="t-c">No data found</p>
        </div>
        <div v-else>
          <div class="card-row">
            <i class="fas fa-user m-r"></i> {{consignee.name}}
          </div>
          <div class="card-row">
            <i class="fas fa-envelope m-r"></i> consignee@gmail.com
          </div>
          <div class="card-row">
            <i class="fas fa-phone m-r"></i> +1 455 112 1111
          </div>
          <div class="card-row">
            <i class="fas fa-map-marker-alt m-r"></i> {{consignee.address}},  {{consignee.city}}, {{consignee.state}}
          </div>
        </div>
      </div>
      <!-- <div class="card-image">
        <img src="../assets/map.png">
      </div> -->
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'InvoiceConsigneeComponent',
  props: ['consignee'],
  mounted () {
    var ctx = this
    setTimeout(function () {
      ctx.initMap()
    }, 500)
  },
  methods: {
    initMap () {
      let ctx = this
      let geocoder = new google.maps.Geocoder()
      let latlng = new google.maps.LatLng(35.0456, 85.3097)
      let myOptions = {
        zoom: 8,
        center: latlng,
        mapTypeControl: false,
        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
        navigationControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      let map = new google.maps.Map(document.getElementById("map-consignee"), myOptions);
      if (geocoder && this.consignee) {
        geocoder.geocode( { 'address': ctx.consignee.address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
              map.setCenter(results[0].geometry.location);

              var infowindow = new google.maps.InfoWindow(
                { content: '<b>'+ctx.consignee.address+'</b>',
                  size: new google.maps.Size(150,50)
                });

              var marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                title: ctx.consignee.address
              });
              google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map,marker);
              });

            } else {
              console.log("No results found");
            }
          } else {
            console.log("Geocode was not successful for the following reason: " + status);
          }
        });
      }

    }
  }
}
</script>
<style lang="scss">
.invoice-consignee {
  .el-card__body {
    padding: 0;
  }

  .card-header {
    padding: 0.8rem;
    border-bottom: 1px solid #efefef;
    color: #ffffff;
    background-color: #002d7b;
  }

  .map {
    height: 150px;
  }

  .card-content {
    padding: 1rem;

    .card-row {
      padding: 0.5rem 0rem;
      font-size: 0.9rem;
      
      &:first-child {
        padding-top: 0;
      }

      &:last-child {
        padding-bottom: 0;
      }
    }
  }

  .fas {
    color: lighten(#000, 40%);
  }

  .card-image {
    img {
      margin-bottom: -8px;
      max-height: 8rem;
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>