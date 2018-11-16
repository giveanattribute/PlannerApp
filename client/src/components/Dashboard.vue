<template>


<div class="start">
   <h1>{{msg}}</h1>

<div class="container">
    <div class="row">
        <div class="col">
            <div class="jumbotron bg-primary text-light">
                <h1 class="display-4">Università</h1>
                <p class="lead">News, Orario lezioni, Appelli.</p>
            </div>

        </div>
        <div class="col">
            <div class="jumbotron bg-primary text-light">
                <h1 class="display-4">Weather</h1>
                <p class="lead">Controlla il tempo climatico.</p>
            </div>

        </div>
        <div class="col">
            <div class="jumbotron bg-primary text-light">
                <h1 class="display-4">Messaggi</h1>
                <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
            </div>

        </div>
        <div class="col">
            <div class="jumbotron bg-primary text-light">
                <h1 class="display-4">Notizie</h1>
                <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
            </div>

        </div>
    </div>
</div>
</div>

<!-- End Body -->


</template>
<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      msg: 'Ciao!'
    }
  }
}
</script>