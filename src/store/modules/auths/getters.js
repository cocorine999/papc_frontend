import { AUTH_TOKEN } from "@/services/configs/environment.js";

export default {
  GET_AUTHENTICATE_USER: (state) => {
    console.log("visiteurs", localStorage.getItem("visiteurs"));
    // Si c'est un visiteur, retourner une valeur spécifique
    if (localStorage.getItem("visiteurs")) {
      // alert("A")
      return {
        id: "Pkdx4A6DyRLbeMj6lWNoZaQxXV510G3z0kJBA9Dgpv4q7kKnYmEP2drzwZYrzoK7",
        nom: "Visiteurs",
        email: "bsi@celeriteholding.com",
        contact: "67217812",
        type: "visiteurs",
        profil: {
          id: "AdVOYRq4wkMlqV24Rgvp1Lxa6Yd5Zj8Vv8O9n7ermEyJQKXWAGbPzN03w65vg7bz",
          nom: "GANGBO Oswald (Coordinateur PAPC)",
          created_at: "2023-02-03",
          user: {
            id: "DKwjvN1WK5Dzvj4m9dGlA61LMyYgq7JRqOoXnaerVWbpPN2BQ0xZwREk2rYV0LoE",
            nom: "GANGBO Oswald (Coordinateur PAPC)",
            prenom: null,
            email: "ogangbo@sirat.bj",
            contact: "95207588",
            poste: null,
            type: "unitee-de-gestion",
            emailVerifiedAt: "2023-02-03T08:59:41.000000Z",
            code: 0,
            created_at: "2023-02-03",
            first_connexion: 1,
            statut: 1,
            account_verification_request_sent_at: null,
            password_update_at: "2023-02-03 11:48:36",
            last_password_remember: "$2y$10$/L60heayHkInKKLTuwJ1bOg2aem9rO3bWTrL2buyiJLWHm.rn.x0q",
            link_is_valide: 0,
            lastRequest: "2025-03-26 15:48:21",
            roles: [{ id: "bXYGwygV92XDaemgqRxGEW36AM7QBP49dLlVo5YvNOypZjn8wKb0dzr1Px01Z8QW", nom: "Unitee de gestion", description: "Unitee de gestion", roleable_type: null, roleable_id: null, created_at: "2023-02-03T08:29:11.000000Z" }],
          },
        },
        programme: { id: "Kl4ankW8vn18AZDLmoaqz3YdgwkG5RE9AEMKBQOP2y9le4pXrj60Wbx71mr7dxLq", nom: "PROGRAMME D’ASSAINISSEMENT PLUVIAL DE COTONOU", code: "4.1.1.3", budgetNational: 9000000000, debut: "2020-02", fin: "2030-12", description: "PAPC", objectifGlobaux: "PAPC OBJECTIF", created_at: "2023-02-03T08:40:33.000000Z", organismeDeTutelle: "Ministère" },
        role: [
          {
            id: "YaWMwBVeew8OvMldZgmXKjE1bBpxqQ4bMLaAzD230r6onR57GWYNV9yPPnrjx07G",
            nom: "Visiteurs",
            slug: "visiteurs",
            permissions: [
              { id: "ogNarQLxR0Ng578pGdD3Pblo9Q1nrYyWQVJAxZWw6KvMEXmLqBzke2a4Vqm86M1W", nom: "Voir un utilisateur", slug: "voir-un-utilisateur" },
              { id: "P70691WY8A39wM1b5KoN4eaDvVXZBryz5KOqxQ6ElgmRPdY0zLGp7Wn2kkDXdpLb", nom: "Voir un bailleur", slug: "voir-un-bailleur" },
              { id: "e5XbBqN1Dgd5WP78MGEQmAzabK6kZNjN5lyvwo43RLnerq2X0VBYl9px1zrwDK2n", nom: "Voir un decaissement", slug: "voir-un-decaissement" },
              { id: "1dmzxnaVQYlnZR2oVBzdE6GrpL5KwkyRV5yexA8MPavN071gqmXW9D3b4WrQ0lwo", nom: "Voir un mod", slug: "voir-un-mod" },
              { id: "VYBw2dmbovW4axDEV5A2KQG987dZbgyedGOkzYLN3X0wBMrlPqpmRn16eg1rkM6Q", nom: "Voir une entreprise executante", slug: "voir-une-entreprise-executante" },
              { id: "BZMvE94qa2lN7Rd6V5gEXrMm4Lkpw1OweBjoY03BPvq8WD9zGAeQbxKnZYxLGV0N", nom: "Voir une mission de controle", slug: "voir-une-mission-de-controle" },
              { id: "3VWMamEN25bkXqgvwL0N73GnRdx86oJAVVOQB4AE1pmYDP9alKzMrWeVZzPnQLXv", nom: "Voir un projet", slug: "voir-un-projet" },
              { id: "2dbBDE8gWwg86qP2xLXKaAmrzoEZGpO1pgJbYn4D709k5NV1vle3RMdQBeGk7KqN", nom: "Voir une composante", slug: "voir-une-composante" },
              { id: "07BZNxb9Q4mR1Y0AkbE3xvzo2GdDqnjZwGJZ6leKapX95rgMwP78NLBVWQ4LEvAn", nom: "Voir une activite", slug: "voir-une-activite" },
              { id: "1evWV5MdKdDRgvkQ3Eb74rwYGNPMqayGxDjLWAV86Z152ml9pnzxBeXo0aK62oqG", nom: "Voir un indicateur", slug: "voir-un-indicateur" },
              { id: "3ZG0WYaz5MzLWQEZ3omXRaDKqPdwlgJrgvOb471GA9pv608N2neYxkBrVAEdqg2b", nom: "Voir une tache", slug: "voir-une-tache" },
              { id: "Eldz6XqRpNr5B7eZVzolX34nwKAPgYJ0YpOqE0Gak9L8dDRWbQ6vxM12mW520m3B", nom: "Voir un indicateur mod", slug: "voir-un-indicateur-mod" },
              { id: "VldMbkWAXRq7rAY4KG3Vo08Bm6dQExj67pJNDazpWnZM2bw5lk9PL1egvDpQ58ng", nom: "Voir une ong", slug: "voir-une-ong" },
              { id: "lkL4D6zBZxmn8MYoazqwQ6NE1W5439JvDNylBre7Gdgv0P2XDRbVpkKALaXeMwQ2", nom: "Voir une agence", slug: "voir-une-agence" },
              { id: "AwoNYWVQPGoRDVnab1wl7NkLMe4v3ZJYZeO2r089KmY6gA5xqQBWdzpXE57XE2qP", nom: "Voir une institution", slug: "voir-une-institution" },
              { id: "lAKL6w28WwLzk1gRAMmPa2Z65ldDvEjnoXJXNpb8YBKVn3479qorQx0eGBMQqYdG", nom: "Voir un ano", slug: "voir-un-ano" },
              { id: "RY61EWeNLbr61PN3KB8qQxXvMwmlRkOgPqy9gn0V74G5EdpeWYZozDAa2dM2rLqG", nom: "Voir une reponse ano", slug: "voir-une-reponse-ano" },
              { id: "WnkzVQNmp5NxGk069zalbZgRndqYvVj8xQj128WDAwKQPe7mEL4MBrX3oo42p3l8", nom: "Voir un plan de decaissement", slug: "voir-un-plan-de-decaissement" },
              { id: "K02Rg4Avm94Y6No8Pqr7XLVkEW3zRdJ4E8ODxQn2lBvb0awgM1ApZK5Ge7EMwVpD", nom: "Voir un suivi financier", slug: "voir-un-suivi-financier" },
              { id: "XDqP2NpWoE2xDzaqYAGm7Qvr59b4VPj2D4Onw61XWl3Z8BNMpRKdk0Legw347Z5r", nom: "Voir un role", slug: "voir-un-role" },
              { id: "Ykgdw0mLqW8ebv6Ya04ZkNz9BEDV2QOKXdy1owxP3RA57XpLKlGgdrnmMpnAB7GN", nom: "Voir un pap", slug: "voir-un-pap" },
              { id: "boNPwm7YxYrqvXBz1gnG5D2Ep7aNd3JadpjLA9l06K4VokmeZRMPwbWQ8rRBvlEx", nom: "Voir une activite environnementale", slug: "voir-une-activite-environnementale" },
              { id: "eZAGNMgl9xbE6MGmgRa5WZkVzn3NDojo6GyAl1Qr780wqKY4dpXvP2eBLqW58bdp", nom: "Voir une activite environnementale mod", slug: "voir-une-activite-environnementale-mod" },
              { id: "6DZEWlqb0N6R18olQPgEnBXKrLkxzeOxMpy2ZWV5wp49dAYDabGMmv73q4zmL2ex", nom: "Voir un site", slug: "voir-un-site" },
              { id: "aYeAw6dkxL3mAvQdqKnGZXWPB8z065yLM8jlkog2ENY7rVbDMewR94ap1grDZLKX", nom: "Voir une checklist", slug: "voir-une-checklist" },
              { id: "xw2bM6Er6pxWPm8LNw7r3V0Yqo45kvJmArJQXnlgdEKzZA2bDGR1eM9BaP3K91qd", nom: "Voir une passation", slug: "voir-une-passation" },
              { id: "8B0DxAZbGbrdAVLoWqaB94lx5MRkvYj3XYJwDgpZe2K8P3EmXz0n16NQ7qXn3e4N", nom: "Voir une revision", slug: "voir-une-revision" },
              { id: "BwdV5nM8WNVQxXgEYm0D7MRbrz6dlkJ7N3jpBL5n9vaP8A3Kwo1G4Zqe2rpeANX2", nom: "Voir une configuration alerte", slug: "voir-une-configuration-alerte" },
              { id: "z238dv5437248qgQZonNrWYzVpX90DJB7xOx1mRAdbKE5L6MeaGPlwkvBYlqEgb0", nom: "Voir une categorie", slug: "voir-une-categorie" },
              { id: "1YXxe5MLeRBvQ0YrAVgzk7alNPKEWdJMWzy4nm689XwGbZ3x521pqLoDMV0Nao49", nom: "Voir un suivi environnementale", slug: "voir-un-suivi-environnementale" },
              { id: "6xmEad79X6lR5WxPg13M274E8deonkJD3njpBrLVwqab9YKQmAZv0DGzNGlNkBoW", nom: "Voir un suivi indicateur", slug: "voir-un-suivi-indicateur" },
              { id: "dD4VMGaZZp3rX5xzdYVkg29nRMBWb7y5xXOawvGA6Kl0Lqo84DmQeENP13g91lR8", nom: "Voir un suivi indicateur mod", slug: "voir-un-suivi-indicateur-mod" },
              { id: "wKpZ65NnvxwKP3zgrDMbZ5qmA4EVY1JVPZyXpe7nk8lWRo92L6Qa0GNdBxeYXEqo", nom: "Voir un formulaire", slug: "voir-un-formulaire" },
              { id: "NMQnd9XBwbmqV10nB3v7EzMKArW6LZObx0je8l4Xg9RQoYpdPk2NxaDG5562r8Ao", nom: "Voir un suivi", slug: "voir-un-suivi" },
              { id: "4lEeRbpwX9x0Qbz6agnoN5MReLW4AYJdroyEd3kDBG2mwr1VZ8qvlpP7KmPvNd2g", nom: "Voir un rappel", slug: "voir-un-rappel" },
              { id: "DGmlWvrklbg7ZP9Lw2vRBXN6AKMzqoOPeLy3V1W0Dm8dEnY5xrQkpae4G70xB1Z4", nom: "Voir une maitrise oeuvre", slug: "voir-une-maitrise-oeuvre" },
              { id: "82xRkevVnx8BGD1oN5l6qXLzbe342EjQkQOpK0mZMP7rVwvgaWdkYAQ9Rqz9wX5n", nom: "Voir un fichier", slug: "voir-un-fichier" },
              { id: "1BDr9pL8nqEe0zB9PMDRQgxl4w7kr3Jqn3O1YvAd2ZpGKb586aoWVLXNml26YngR", nom: "Voir une unite de mesure", slug: "voir-une-unite-de-mesure" },
              { id: "e8dWk3Q5l4rwAK9vkGg6mYnVR3XazPJXqlOZQ8dMxED5LpoqN0BeW217b17mbX0l", nom: "Voir un audit", slug: "voir-un-audit" },
              { id: "73kmQXYqmXgLWZaYNVk2G4P1ld98pzyEaMyvQKRAE367nbxeoMD50wBrqLdxPZD6", nom: "Voir ptab", slug: "voir-ptab" },
              { id: "ogNarQLxR0Ng578pGdD3Pblo9Q1nrYyW1VJAxZWw6KvMEXmLqBzke2a4Vqm86M1W", nom: "Voir revision ptab", slug: "voir-revision-ptab" },
              { id: "P70691WY8A39wM1b5KoN4eaDvVXZBryzqKOqxQ6ElgmRPdY0zLGp7Wn2kkDXdpLb", nom: "Voir ppm", slug: "voir-ppm" },
              { id: "e5XbBqN1Dgd5WP78MGEQmAzabK6kZNjNDlOvwo43RLnerq2X0VBYl9px1zrwDK2n", nom: "Voir le plan de decaissement du ptab", slug: "voir-le-plan-de-decaissement-du-ptab" },
              { id: "a6AlpQmVwY7gPdWDbXZGNaQv01rR2lypleyqLBK5e63pxkVE8mz9on4AMdv8x3RX", nom: "Voir une permission", slug: "voir-une-permission" },
              { id: "VYBw2dmbovW4axDEV5A2KQG987dZbgyePGOkzYLN3X0wBMrlPqpmRn16eg1rkM6Q", nom: "Voir le point financier des activites", slug: "voir-le-point-financier-des-activites" },
              { id: "pzW9MbKkvwzG1A4n2V5QBp3E90KmgbJlo8jqDN6raPlRoMkedx78ZWLXYG8AR3nx", nom: "Voir statistique activite", slug: "voir-statistique-activite" },
              { id: "XDqP2NpWoE2xDzaqYAGm7Qvr59b4VPj284Onw61XWl3Z8BNMpRKdk0Legw347Z5r", nom: "Voir details projet", slug: "voir-details-projet" },
              { id: "Ykgdw0mLqW8ebv6Ya04ZkNz9BEDV2QOKmdj1owxP3RA57XpLKlGgdrnmMpnAB7GN", nom: "Voir formulaire mod", slug: "voir-formulaire-mod" },
              { id: "boNPwm7YxYrqvXBz1gnG5D2Ep7aNd3JaYpJLA9l06K4VokmeZRMPwbWQ8rRBvlEx", nom: "Voir formulaire mission de controle", slug: "voir-formulaire-mission-de-controle" },
              { id: "eZAGNMgl9xbE6MGmgRa5WZkVzn3NDojoMGOAl1Qr780wqKY4dpXvP2eBLqW58bdp", nom: "Voir formulaire entreprise executant", slug: "voir-formulaire-entreprise-executant" },
              { id: "eZAGNMgl9xbE6MGmgRa5WZkVzn3NDojoMbOAl1Qr780wqKY4dpXvP2eBLqW58bdp", nom: "Voir une statistique activite", slug: "voir-une-statistique-activite" },
              { id: "8B0DxAZbGbrdAVLoWqaB94lx5MRkvYj3aAOwDgpZe2K8P3EmXz0n16NQ7qXn3e4N", nom: "Voir unee institution", slug: "voir-unee-institution" },
              { id: "BwdV5nM8WNVQxXgEYm0D7MRbrz6dlkJ77nJpBL5n9vaP8A3Kwo1G4Zqe2rpeANX2", nom: "Voir suivi kobo", slug: "voir-suivi-kobo" },
              { id: "z238dv5437248qgQZonNrWYzVpX90DJBeGjx1mRAdbKE5L6MeaGPlwkvBYlqEgb0", nom: "Voir formulaire kobo", slug: "voir-formulaire-kobo" },
            ],
          },
        ],
        photo: null,
      };
    } else {
      // Sinon, on regarde s'il y a un utilisateur authentifié
      if (state.authenticateUser) {
        return state.authenticateUser;
      }

      const storedUser = localStorage.getItem("authenticateUser");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        state.authenticateUser = parsedUser;
        return state.authenticateUser;
      }

      // Si rien n'est trouvé, retourne null
      return null;
    }

    // Vérifier si l'utilisateur est déjà authentifié dans le state
    // return state.authenticateUser ? state.authenticateUser : localStorage.getItem("authenticateUser") ? (JSON.parse(localStorage.getItem("authenticateUser")) !== undefined ? (state.authenticateUser = JSON.parse(localStorage.getItem("authenticateUser"))) : null) : null;
  },

  GET_ACCESS_TOKEN: (state) => {
    // Si c'est un visiteur, retourner un token fixe
    if (localStorage.getItem("visiteurs")) {
      return AUTH_TOKEN;
    }

    // Vérification de l'existence du token dans le state ou localStorage
    if (state.access_token) {
      return state.access_token;
    }

    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      try {
        const parsedToken = JSON.parse(storedToken);
        if (parsedToken !== undefined) {
          state.access_token = parsedToken;
          return state.access_token;
        }
      } catch (e) {
        console.error("Erreur lors du parsing du token :", e);
      }
    }

    return null;
  },

  IS_AUTHENTICATED: (getters, state) => {
    return getters.GET_ACCESS_TOKEN ? true : null;
  },
};
