<template>
    <v-row>
        <v-col cols="12">
            <v-card class="ma-5">
                <v-img :src="randomPattern" height="200" cover></v-img>
                <v-card-action>
                    <v-list-item class="mt-2">
                        <template v-slot:prepend>
                            <div class="text-h4">
                                <span class="me-1">Testowyj projekt</span>
                                <v-divider :thickness="2" vertical color="secondary"></v-divider>
                                <v-icon icon="custom:vueIcon"></v-icon>
                            </div>
                        </template>
                        <template v-slot:append>
                            <v-btn variant="tonal" color="secondary">Visit repo</v-btn>
                            <v-list-item></v-list-item>
                            <v-btn variant="tonal" color="primary">Visit website</v-btn>
                        </template>
                    </v-list-item>
                </v-card-action>
                <v-row class="ma-1">
                    <v-col cols="6" variant="outlined">
                        <v-sheet border="md" class="text-body-1 pa-4">
                            The project page uhuh {{ slug }}
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, libero suscipit ex cumque
                            sint
                            ab
                            perspiciatis asperiores quaerat commodi eaque sequi reprehenderit culpa laudantium, nobis
                            debitis
                            assumenda consectetur! Iste sequi quia totam animi quod provident rem itaque eum placeat, fugit
                            illum
                            ipsa quisquam, tempore fugiat quidem sapiente nesciunt ea, dicta perspiciatis alias ullam quas
                            harum
                            repellat officiis? Rem iure quo id iste eos ea, excepturi tempora laboriosam possimus impedit
                            eaque,
                            itaque hic veritatis voluptatem quam deserunt? Pariatur nisi commodi reiciendis sequi et ut rem
                            animi
                            ipsum tempore itaque, sunt distinctio ab aperiam at quasi, in fugiat consequatur doloremque
                            perferendis
                            voluptates vitae tenetur debitis minima deserunt? Eius culpa ea magni dolorum commodi sit aut
                            quod
                            possimus explicabo autem voluptatibus ratione, ab, consectetur pariatur! Sunt veritatis sint
                            nesciunt
                            nemo quo, commodi in ad, atque doloribus maiores, ratione odit? Autem fuga sit non consequuntur,
                            sint
                            doloremque deserunt illo fugit sunt, excepturi dolorum ad recusandae iusto voluptate nostrum
                            itaque
                            consectetur in eaque mollitia? Quae maxime placeat cumque id hic quis maiores velit enim fuga
                            itaque
                            porro nisi qui quam quibusdam eaque tempora harum ipsa earum nihil deserunt, tenetur pariatur
                            obcaecati
                            odit error. Odio expedita labore quis autem quisquam quia veritatis, deserunt sequi eveniet
                            atque
                            doloribus architecto voluptatum id quod, illum voluptate, error ullam iusto distinctio cumque
                            eligendi
                            maxime molestias aperiam tempora? Ipsum asperiores cum veritatis voluptate distinctio eos
                            quaerat
                            ipsa
                            exercitationem laboriosam eum tenetur similique pariatur reiciendis, nemo repellendus provident
                            deserunt
                            vero accusamus amet beatae quasi blanditiis rerum! Saepe vero, fugiat dignissimos repellendus
                            quam
                            possimus aperiam distinctio, doloremque exercitationem ipsum quasi voluptatibus assumenda alias
                            corporis
                            dolor laborum optio eveniet! Quos cupiditate maxime voluptas minima. Vel quisquam distinctio
                            voluptatem!
                            Sapiente corrupti placeat laudantium temporibus blanditiis quis impedit excepturi, porro ea
                            adipisci
                            cupiditate. Earum delectus sit totam ducimus vero aut dolor reprehenderit molestiae veniam,
                            ratione
                            aliquam accusantium voluptates tempore voluptatum impedit. Debitis dolores officiis, expedita
                            nostrum in
                            ducimus nemo hic sed quam adipisci libero doloremque dicta labore ab placeat quis fuga eos vero
                            quas
                            assumenda autem minima voluptates! Perspiciatis error ipsam iusto repellat natus omnis. Itaque,
                            quia
                            omnis saepe sequi ad repellat corrupti error. Reiciendis, incidunt labore? Quo iusto molestiae
                            omnis
                            magnam ad consectetur. Modi dolorum illum veritatis earum adipisci eligendi architecto repellat
                            distinctio?
                        </v-sheet>
                    </v-col>
                    <v-col cols="6">
                        <v-sheet border="md" class="pa-4">
                            <v-carousel>
                                <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                                    cover></v-carousel-item>

                                <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
                                    cover></v-carousel-item>

                                <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                                    cover></v-carousel-item>
                            </v-carousel>
                        </v-sheet>
                        <v-spacer></v-spacer>
                        <v-sheet border="md" class="pa-4 mt-6">
                            <div class="text-h6">Tech</div>
                            <v-divider :thickness="2"></v-divider>
                            <v-chip-group style="pointer-events: none;">
                                <v-chip prepend-icon="mdi-vuetify" variant="outlined" color="secondary">
                                    Chip
                                </v-chip>
                                <v-chip prepend-icon="mdi-vuetify" variant="outlined" color="secondary">
                                    Chip
                                </v-chip>
                                <v-chip prepend-icon="mdi-vuetify" variant="outlined" color="secondary">
                                    Chip
                                </v-chip>
                                <v-chip prepend-icon="mdi-vuetify" variant="outlined" color="secondary">
                                    Chip
                                </v-chip>
                                <v-chip prepend-icon="mdi-vuetify" variant="outlined" color="secondary">
                                    Chip
                                </v-chip>
                            </v-chip-group>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: ['slug'],
    data() {
        return {
            randomPattern: ''
        }
    },
    async beforeMount() {
        // All of these pictures are from https://www.freepik.com/ 
        // Randomly assigns a header picture
        let patterns = [
            () => import('@/assets/patterns/1_shape.svg'),
            () => import('@/assets/patterns/2_shape.svg'),
            () => import('@/assets/patterns/3_shape.svg'),
            () => import('@/assets/patterns/4_shape.svg'),
            () => import('@/assets/patterns/5_shape.svg'),
            () => import('@/assets/patterns/6_shape.svg'),
            () => import('@/assets/patterns/7_shape.svg')
        ]
        let randomPatternIndex = Math.floor(Math.random() * patterns.length)
        let patternModule = await patterns[randomPatternIndex]()
        this.randomPattern = patternModule.default
    }
}
</script>